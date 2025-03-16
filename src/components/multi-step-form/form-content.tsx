import type { FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ChevronLeft, ArrowRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMultiStepForm } from "./context";
import type { FieldValues } from "react-hook-form";
import { StepForm } from "./step-form";
import { SuccessView } from "./success-view";
import { cn } from "@/lib/utils";

interface FormContentProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

const formContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

export function FormContent({ onSubmit, onCancel }: FormContentProps) {
  const {
    currentStep,
    nextStep,
    prevStep,
    isFirstStep,
    isLastStep,
    isSubmitting,
    isSuccess,
    config,
    form,
    formData,
  } = useMultiStepForm<FieldValues>();

  // Verificar se config e config.steps existem
  if (!config || !config.steps || config.steps.length === 0) {
    return <div className="p-6">Configuração do formulário inválida</div>;
  }

  const currentStepData = config.steps.find((s) => s.id === currentStep);
  const StepIcon = currentStepData?.icon;

  // Verificar se o passo atual tem erros
  const hasCurrentStepErrors = () => {
    if (!form.formState.errors || !currentStepData) return false;
    const currentFields = currentStepData.fields || [];
    return currentFields.some((field) =>
      Object.prototype.hasOwnProperty.call(form.formState.errors, field)
    );
  };

  // Componente para o indicador de progresso mobile
  const MobileProgressIndicator = () => (
    <div className="flex justify-between mb-8 md:hidden">
      {config.steps.map((s, i) => (
        <div key={s.id} className="flex flex-col items-center">
          <div
            className={cn(
              "h-2 rounded-full w-full mx-1",
              i + 1 < currentStep
                ? "bg-primary"
                : i + 1 === currentStep
                ? "bg-primary/70"
                : "bg-muted"
            )}
            style={{ width: `${100 / config.steps.length - 5}%` }}
          />
          <span className="text-xs text-muted-foreground mt-1">{i + 1}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="p-6 flex-1 overflow-y-auto">
        <DialogHeader className="mb-6">
          <div className="flex items-center gap-2">
            {StepIcon && (
              <div className="bg-primary/10 p-1.5 rounded-md">
                <StepIcon className="h-5 w-5 text-primary" />
              </div>
            )}
            <DialogTitle className="text-xl">
              {isSuccess
                ? config.successTitle || "Operação Concluída"
                : currentStepData?.title || "Formulário"}
            </DialogTitle>
          </div>
          {!isSuccess && currentStepData && (
            <div className="text-sm text-muted-foreground mt-2 ml-10">
              {currentStepData.description}
            </div>
          )}
        </DialogHeader>

        <MobileProgressIndicator />

        <Form {...form}>
          <form id="multi-step-form" onSubmit={onSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {!isSuccess && currentStepData && (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                  variants={formContainerVariants}
                >
                  <StepForm step={currentStepData} control={form.control} />
                </motion.div>
              )}

              {isSuccess && (
                <SuccessView
                  formData={formData}
                  successComponent={config.successComponent}
                  title={config.successTitle}
                  description={config.successDescription}
                />
              )}
            </AnimatePresence>
            <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-0 p-4 border-t mt-auto sticky bottom-0 bg-background">
              {isFirstStep && !isSuccess && (
                <>
                  <Button
                    type="button"
                    onClick={onCancel}
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    {config.cancelButtonText || "Cancelar"}
                  </Button>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="w-full sm:w-auto">
                          <Button
                            type="button"
                            onClick={() => nextStep()}
                            className="w-full sm:w-auto gap-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                            disabled={hasCurrentStepErrors()}
                          >
                            {config.nextButtonText || "Próximo"}
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Avançar para o próximo passo</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              )}

              {!isFirstStep && !isLastStep && !isSuccess && (
                <>
                  <div className="flex w-full sm:w-auto gap-2">
                    <Button
                      type="button"
                      onClick={() => prevStep()}
                      variant="outline"
                      className="flex-1"
                    >
                      <ChevronLeft className="mr-1 h-4 w-4" />
                      {config.backButtonText || "Voltar"}
                    </Button>
                    <Button
                      type="button"
                      onClick={() => nextStep()}
                      className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                      disabled={hasCurrentStepErrors()}
                    >
                      {config.nextButtonText || "Próximo"}
                    </Button>
                  </div>
                </>
              )}

              {isLastStep && !isSuccess && (
                <>
                  <div className="flex w-full sm:w-auto gap-2">
                    <Button
                      type="button"
                      onClick={() => prevStep()}
                      variant="outline"
                      className="flex-1"
                    >
                      <ChevronLeft className="mr-1 h-4 w-4" />
                      {config.backButtonText || "Voltar"}
                    </Button>
                    <Button
                      type="submit"
                      form="multi-step-form"
                      className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                      disabled={isSubmitting || hasCurrentStepErrors()}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-pulse">Enviando</span>
                          <span className="animate-pulse delay-100">.</span>
                          <span className="animate-pulse delay-200">.</span>
                          <span className="animate-pulse delay-300">.</span>
                        </>
                      ) : (
                        config.submitButtonText || "Enviar"
                      )}
                    </Button>
                  </div>
                </>
              )}

              {isSuccess && (
                <Button
                  type="button"
                  onClick={onCancel}
                  className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                >
                  Concluir
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </div>
    </div>
  );
}
