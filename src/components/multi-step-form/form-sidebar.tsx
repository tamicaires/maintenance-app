import { CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useMultiStepForm } from "./context"
import type { FieldValues } from "react-hook-form"

export function FormSidebar() {
  const { currentStep, config, isSuccess } = useMultiStepForm<FieldValues>()

  // Verificar se config e config.steps existem
  if (!config || !config.steps || config.steps.length === 0) {
    return null
  }

  const { steps } = config

  return (
    <div className="hidden md:flex w-[220px] bg-gradient-to-b from-primary/5 to-primary/10 flex-col p-6 border-r">
      <div className="flex items-center gap-2 mb-10">
        <h3 className="font-semibold text-lg">{config.steps[0]?.title || "Novo Formulário"}</h3>
      </div>

      <div className="space-y-8 relative">
        {/* Vertical line connecting steps */}
        <div className="absolute left-[17px] top-[24px] bottom-[24px] w-0.5 bg-muted-foreground/20 z-0"></div>

        {steps.map((step) => {
          const StepIcon = step.icon
          const isActive = step.id === currentStep
          const isCompleted = step.id < currentStep

          return (
            <div
              key={step.id}
              className={cn(
                "flex items-start gap-3 transition-all relative z-10",
                isActive ? "text-primary" : "text-muted-foreground",
                isCompleted && "text-primary/70",
              )}
            >
              <div
                className={cn(
                  "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-medium transition-all duration-200",
                  isActive && "border-primary bg-primary text-primary-foreground ring-4 ring-primary/20",
                  isCompleted && "border-primary/70 bg-primary/10 text-primary",
                  !isActive && !isCompleted && "bg-background",
                )}
              >
                {isCompleted ? <CheckCircle className="h-4 w-4" /> : <StepIcon className="h-4 w-4" />}
              </div>
              <div className="flex flex-col pt-1">
                <span className={cn("font-medium", isActive && "font-semibold")}>{step.title}</span>
                <span className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{step.description}</span>
              </div>
            </div>
          )
        })}

        {isSuccess && (
          <div className="flex items-start gap-3 text-primary relative z-10">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-green-500 bg-green-500 text-white ring-4 ring-green-500/20">
              <CheckCircle className="h-4 w-4" />
            </div>
            <div className="flex flex-col pt-1">
              <span className="font-semibold">Concluído</span>
              <span className="text-xs text-muted-foreground mt-0.5">
                {config.successDescription || "Operação concluída com sucesso"}
              </span>
            </div>
          </div>
        )}
      </div>

      {currentStep <= steps.length && (
        <div className="mt-auto pt-6">
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-3 text-xs text-amber-800">
              <div className="flex gap-2 items-start">
                <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">Dica</p>
                  <p className="opacity-90">
                    {steps.find((s) => s.id === currentStep)?.description || "Preencha os campos corretamente."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

