"use client";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LockKeyhole, ArrowLeft, LogIn } from "lucide-react";
import { useAuth } from "@/core/auth/auth-provider";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 10000); // 10 seconds
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4 sm:p-6 md:p-8">
      <div className="max-w-md w-full mx-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-30" />
          <div className="relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="rounded-full bg-primary/10 p-4 border border-primary/20">
                  <LockKeyhole className="h-12 w-12 text-primary" />
                </div>

                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Acesso Não Autorizado
                </h1>

                <p className="text-muted-foreground max-w-[30rem]">
                  Você precisa estar autenticado para acessar esta página. Por
                  favor, faça login para continuar.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mt-4">
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => navigate(-1)}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Voltar
                  </Button>

                  <Button className="gap-2" onClick={() => navigate("/login")}>
                    <LogIn className="h-4 w-4" />
                    Fazer Login
                  </Button>
                </div>
              </div>
            </div>

            <div className="h-1.5 w-full bg-gradient-to-r from-primary via-secondary to-primary animate-gradient" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mt-6 text-sm text-muted-foreground"
        >
          {!isAuthenticated && (
            <p>
              Você será redirecionado para a página de login em alguns
              segundos...
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
