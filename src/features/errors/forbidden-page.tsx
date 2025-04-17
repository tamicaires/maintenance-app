"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ForbiddenPage() {
  const navigate = useNavigate();

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
                  <ShieldAlert className="h-12 w-12 text-destructive" />
                </div>

                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Acesso Proibido
                </h1>

                <p className="text-muted-foreground max-w-[30rem]">
                  Você não tem permissão para acessar esta página. Se você
                  acredita que isso é um erro, entre em contato com o
                  administrador do sistema.
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

                  <Button className="gap-2" onClick={() => navigate("/")}>
                    <Home className="h-4 w-4" />
                    Ir para Dashboard
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
            Se você precisar de ajuda, entre em contato com o suporte técnico.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
