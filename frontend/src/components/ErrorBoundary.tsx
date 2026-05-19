import { Component, ErrorInfo, ReactNode } from "react";
import { Box, Typography, Button, Container, alpha } from "@mui/material";
import { ErrorOutline, Refresh } from "@mui/icons-material";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100vh",
              textAlign: "center",
              gap: 3,
            }}
          >
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <ErrorOutline color="error" sx={{ fontSize: 50 }} />
            </Box>
            <Typography variant="h4" fontWeight="bold">
              عذراً، حدث خطأ غير متوقع
            </Typography>
            <Typography color="text.secondary">
              لقد واجهنا مشكلة أثناء تحميل هذه الصفحة. يرجى المحاولة مرة أخرى لاحقاً.
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<Refresh />}
              onClick={this.handleReload}
              sx={{ mt: 2, borderRadius: 2 }}
            >
              تحديث الصفحة
            </Button>
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
