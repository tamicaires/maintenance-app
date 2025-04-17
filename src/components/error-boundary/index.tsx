import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    // You could also log to an error reporting service here
  }

  resetErrorBoundary = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-destructive/5 p-4 sm:p-6 md:p-8">
          <div className="max-w-md w-full mx-auto">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-destructive/20 to-orange-500/20 rounded-full blur-3xl opacity-30" />
              <div className="relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl shadow-xl overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="rounded-full bg-destructive/10 p-4 border border-destructive/20">
                      <AlertCircle className="h-12 w-12 text-destructive" />
                    </div>

                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                      Ops, algo deu errado
                    </h1>

                    <p className="text-muted-foreground max-w-[30rem]">
                      Ocorreu um erro inesperado ao carregar a página. Por
                      favor, tente novamente mais tarde ou entre em contato com
                      o suporte, se o problema persistir.
                    </p>

                    <div className="w-full mt-4">
                      <Button
                        variant="destructive"
                        className="gap-y w-full"
                        onClick={this.resetErrorBoundary}
                      >
                        <RotateCcw className="h-4 w-4" />
                        Tentar Novamente
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="h-1.5 w-full bg-gradient-to-r from-destructive via-orange-500 to-destructive animate-gradient" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center mt-6 text-sm text-muted-foreground"
            >
              <p>
                Se você precisar de ajuda, entre em contato com o
                <Button
                  variant="link"
                  className="px-1 text-gray-800 font-semibold"
                  onClick={() => {
                    "... entrando em contato como suporte";
                  }}
                >
                  suporte técnico.
                </Button>
              </p>
            </motion.div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
