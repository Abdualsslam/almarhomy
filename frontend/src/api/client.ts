import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { ApiError } from "../types/api.types";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

class ApiClient {
  private client: AxiosInstance;
  private isRefreshing = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 15000,
      withCredentials: true, // مهم لإرسال واستقبال ملفات تعريف الارتباط
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("accessToken");
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<ApiError>) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
        const status = error.response?.status;
        
        // محاولة تجديد التوكن إذا كان 401 والطلب لم يكن موجهًا للمصادقة
        if (status === 401 && originalRequest && !originalRequest._retry && !originalRequest.url?.includes('/auth/')) {
          if (this.isRefreshing) {
            return new Promise((resolve) => {
              this.refreshSubscribers.push((token: string) => {
                if (originalRequest.headers) {
                  originalRequest.headers.Authorization = `Bearer ${token}`;
                }
                resolve(this.client(originalRequest));
              });
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const response = await axios.post<{ token: string, role: string }>(`${API_BASE_URL}/auth/refresh`, {}, { withCredentials: true });
            const newToken = response.data.token;
            
            localStorage.setItem("accessToken", newToken);
            
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }

            this.refreshSubscribers.forEach((callback) => callback(newToken));
            this.refreshSubscribers = [];
            
            return this.client(originalRequest);
          } catch (refreshError) {
            this.refreshSubscribers = [];
            localStorage.removeItem("accessToken");
            localStorage.removeItem("role");
            localStorage.removeItem("username");
            if (typeof window !== "undefined" && window.location.pathname !== "/") {
              window.location.assign("/");
            }
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        } else if (status === 401 || status === 403) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("role");
          localStorage.removeItem("username");
          if (typeof window !== "undefined" && window.location.pathname !== "/") {
            window.location.assign("/");
          }
        }
        
        return Promise.reject(error);
      }
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, config);
    return response.data;
  }

  public async post<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(
      url,
      data,
      config
    );
    return response.data;
  }

  public async put<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data, config);
    return response.data;
  }

  public async patch<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.patch(
      url,
      data,
      config
    );
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, config);
    return response.data;
  }

  public getClient(): AxiosInstance {
    return this.client;
  }
}

const apiClient = new ApiClient(API_BASE_URL);

export default apiClient;
