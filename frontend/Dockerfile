# Multi-stage build for React frontend

FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

ARG REACT_APP_API_BASE_URL=https://api-almarohomi.smartagency-ye.com
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
ENV CI=false
ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS=--max_old_space_size=4096

# Keep Coolify/Docker BuildKit output alive while CRA is building.
RUN (while true; do echo "frontend build is still running..."; sleep 25; done) & \
    HEARTBEAT_PID=$!; \
    npm run build; \
    BUILD_EXIT=$?; \
    kill $HEARTBEAT_PID || true; \
    exit $BUILD_EXIT

FROM nginx:alpine AS production

COPY --from=builder /app/build /usr/share/nginx/html

RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
      try_files $uri $uri/ /index.html; \
    } \
    location /static { \
      expires 1y; \
      add_header Cache-Control "public, immutable"; \
    } \
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ { \
      expires 1y; \
      add_header Cache-Control "public, immutable"; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
