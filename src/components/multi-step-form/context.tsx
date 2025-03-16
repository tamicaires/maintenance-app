import { createContext, useContext, type ReactNode, useState, useMemo } from "react"
import type { FieldValues, UseFormReturn } from "react-hook-form"
import type { MultiStepFormContextType, MultiStepFormConfig } from "./types"

export const MultiStepFormContext = createContext<MultiStepFormContextType<any> | null>(null)

interface MultiStepFormProviderProps<T extends FieldValues> {
  children: ReactNode
  form: UseFormReturn<T>
  config: MultiStepFormConfig<T>
  isSubmitting?: boolean
  isSuccess?: boolean
}

export function MultiStepFormProvider<T extends FieldValues>({
  children,
  form,
  config,
  isSubmitting = false,
  isSuccess = false,
}: MultiStepFormProviderProps<T>) {
  const [currentStep, setCurrentStep] = useState(1)
  const { steps } = config

  const formData = form.watch()

  const isFirstStep = currentStep === 1
  const isLastStep = currentStep === steps.length
  const totalSteps = steps.length

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps + 1) {
      setCurrentStep(step)
    }
  }

  const nextStep = async () => {
    const currentStepData = steps.find((step) => step.id === currentStep)
    if (!currentStepData) return

    const isValid = await form.trigger(currentStepData.fields as any)
    if (isValid) {
      goToStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    goToStep(currentStep - 1)
  }

  const value = useMemo(
    () => ({
      currentStep,
      totalSteps,
      goToStep,
      nextStep,
      prevStep,
      isFirstStep,
      isLastStep,
      isSubmitting,
      isSuccess,
      form,
      config,
      formData,
    }),
    [currentStep, totalSteps, isSubmitting, isSuccess, form, config, formData],
  )

  return <MultiStepFormContext.Provider value={value}>{children}</MultiStepFormContext.Provider>
}

export function useMultiStepForm<T extends FieldValues>() {
  const context = useContext(MultiStepFormContext) as MultiStepFormContextType<T>

  if (!context) {
    throw new Error("useMultiStepForm must be used within a MultiStepFormProvider")
  }

  return context
}

