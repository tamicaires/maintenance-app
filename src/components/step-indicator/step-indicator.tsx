import type React from "react";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormFields } from "@/app/vehicle/hooks/use-create-vehicle";

type Step = {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  fields: FormFields[];
};

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="space-y-8 relative">
      {/* Vertical line connecting steps */}
      <div className="absolute left-[17px] top-[24px] bottom-[24px] w-0.5 bg-muted-foreground/20 z-0"></div>

      {steps.map((s) => {
        const StepIconComponent = s.icon;
        const isActive = s.id === currentStep;
        const isCompleted = s.id < currentStep;

        return (
          <div
            key={s.id}
            className={cn(
              "flex items-start gap-3 transition-all relative z-10",
              isActive ? "text-primary" : "text-muted-foreground",
              isCompleted && "text-primary/70"
            )}
          >
            <div
              className={cn(
                "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-medium transition-all duration-200",
                isActive &&
                  "border-primary bg-primary text-primary-foreground ring-4 ring-primary/20",
                isCompleted && "border-primary/70 bg-primary/10 text-primary",
                !isActive && !isCompleted && "bg-background"
              )}
            >
              {isCompleted ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <StepIconComponent className="h-4 w-4" />
              )}
            </div>
            <div className="flex flex-col pt-1">
              <span className={cn("font-medium", isActive && "font-semibold")}>
                {s.title}
              </span>
              <span className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                {s.description}
              </span>
            </div>
          </div>
        );
      })}

      {currentStep === 3 && (
        <div className="flex items-start gap-3 text-primary relative z-10">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-green-500 bg-green-500 text-white ring-4 ring-green-500/20">
            <CheckCircle className="h-4 w-4" />
          </div>
          <div className="flex flex-col pt-1">
            <span className="font-semibold">Concluído</span>
            <span className="text-xs text-muted-foreground mt-0.5">
              Veículo cadastrado com sucesso
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
