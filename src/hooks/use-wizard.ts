import { useState, useCallback, useMemo } from "react"

export interface WizardStep {
  id: string
  name: string
}

export interface UseWizardReturn {
  // Current step information
  currentStep: number
  currentStepName: string

  // Steps collection
  steps: WizardStep[]

  // Navigation methods
  goToNextStep: () => void
  goToPreviousStep: () => void
  goToStep: (step: number) => void
  goToStepByName: (name: string) => void

  // Status helpers
  isFirstStep: boolean
  isLastStep: boolean

  // Utilities
  getStepByName: (name: string) => WizardStep | undefined
  getProgress: () => number
  reset: () => void
}

/**
 * A simple hook for managing multi-step wizards with named steps
 *
 * @param steps Array of step definitions
 * @param initialStep Optional initial step index (default: 0)
 * @returns Wizard state and methods
 */
export function useWizard(steps: WizardStep[], initialStep = 0): UseWizardReturn {
  const [currentStep, setCurrentStep] = useState(initialStep >= 0 && initialStep < steps.length ? initialStep : 0)

  // Get current step name
  const currentStepName = useMemo(() => steps[currentStep]?.name || "", [steps, currentStep])

  // Status helpers
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === steps.length - 1

  // Navigation methods
  const goToNextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }, [currentStep, steps.length])

  const goToPreviousStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }, [currentStep])

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 0 && step < steps.length) {
        setCurrentStep(step)
      }
    },
    [steps.length],
  )

  const goToStepByName = useCallback(
    (name: string) => {
      const stepIndex = steps.findIndex((step) => step.name === name)
      if (stepIndex !== -1) {
        setCurrentStep(stepIndex)
      }
    },
    [steps],
  )

  // Utility methods
  const getStepByName = useCallback(
    (name: string): WizardStep | undefined => {
      return steps.find((step) => step.name === name)
    },
    [steps],
  )

  const getProgress = useCallback((): number => {
    return ((currentStep + 1) / steps.length) * 100
  }, [currentStep, steps.length])

  const reset = useCallback(() => {
    setCurrentStep(initialStep >= 0 && initialStep < steps.length ? initialStep : 0)
  }, [initialStep, steps.length])

  return {
    currentStep,
    currentStepName,
    steps,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    goToStepByName,
    isFirstStep,
    isLastStep,
    getStepByName,
    getProgress,
    reset,
  }
}
