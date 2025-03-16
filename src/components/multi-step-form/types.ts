import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import type { FieldValues, UseFormReturn } from "react-hook-form"
import type { z } from "zod"

/**
 * Representa um campo de formulário com suas propriedades
 */
export interface FormFieldConfig<T extends FieldValues> {
  name: keyof T & string
  label: string
  placeholder?: string
  description?: string
  icon?: LucideIcon
  required?: boolean
  type?: "text" | "number" | "email" | "password" | "select" | "textarea" | "date" | "custom"
  options?: Array<{ value: string; label: string }>
  customComponent?: ReactNode
  validation?: z.ZodTypeAny
  width?: "full" | "half"
}

/**
 * Representa uma etapa do formulário multi-etapas
 */
export interface FormStep<T extends FieldValues> {
  id: number
  title: string
  description: string
  icon: LucideIcon
  fields: Array<keyof T & string>
  fieldConfigs: Array<FormFieldConfig<T>>
}

/**
 * Configuração do formulário multi-etapas
 */
export interface MultiStepFormConfig<T extends FieldValues> {
  steps: FormStep<T>[]
  onSubmit: (data: T) => Promise<void> | void
  defaultValues?: Partial<T>
  submitButtonText?: string
  cancelButtonText?: string
  nextButtonText?: string
  backButtonText?: string
  successTitle?: string
  successDescription?: string
  successComponent?: (data: T) => ReactNode
}

/**
 * Props para o componente MultiStepForm
 */
export interface MultiStepFormProps<T extends FieldValues> {
  config: MultiStepFormConfig<T>
  formProviderProps?: UseFormReturn<T>
  onCancel?: () => void
  isSubmitting?: boolean
  isSuccess?: boolean
  triggerComponent?: ReactNode
  className?: string
}

/**
 * Contexto do formulário multi-etapas
 */
export interface MultiStepFormContextType<T extends FieldValues> {
  currentStep: number
  totalSteps: number
  goToStep: (step: number) => void
  nextStep: () => Promise<void>
  prevStep: () => void
  isFirstStep: boolean
  isLastStep: boolean
  isSubmitting: boolean
  isSuccess: boolean
  form: UseFormReturn<T>
  config: MultiStepFormConfig<T>
  formData: T
}

