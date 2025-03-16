import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import type { FieldValues } from "react-hook-form"
import type { MultiStepFormProps } from "./types"
import { MultiStepFormProvider } from "./context"
import { FormSidebar } from "./form-sidebar"
import { FormContent } from "./form-content"
import { cn } from "@/lib/utils"

export function MultiStepForm<T extends FieldValues>({
  config,
  formProviderProps,
  onCancel,
  isSubmitting = false,
  isSuccess = false,
  triggerComponent,
  className,
}: MultiStepFormProps<T>) {
  const [open, setOpen] = useState(false)

  // Criar um schema Zod combinando todas as validações de campo
  const createZodSchema = () => {
    const schemaFields: Record<string, z.ZodTypeAny> = {}

    // Verificar se config e config.steps existem antes de tentar acessá-los
    if (config && config.steps) {
      config.steps.forEach((step) => {
        if (step.fieldConfigs) {
          step.fieldConfigs.forEach((fieldConfig) => {
            if (fieldConfig.validation) {
              schemaFields[fieldConfig.name] = fieldConfig.validation
            }
          })
        }
      })
    }

    return z.object(schemaFields)
  }

  const schema = createZodSchema()

  // Usar o form provider fornecido ou criar um novo
  const form = useForm<T>({
    defaultValues: (config?.defaultValues as any) || {},
    resolver: zodResolver(schema),
  })

  const handleClose = () => {
    setOpen(false)
    form.reset((config?.defaultValues as any) || {})
  }

  const handleSubmit = async (data: T) => {
    try {
      if (config?.onSubmit) {
        await config.onSubmit(data)
      }
    } catch (error) {
      console.error("Form submission error:", error)
    }
  }

  // Verificar se config existe antes de renderizar o componente
  if (!config) {
    console.error("MultiStepForm: config prop is required")
    return null
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{triggerComponent}</DialogTrigger>
      <DialogContent className={cn("sm:max-w-[700px] p-0 overflow-hidden rounded-xl border-0 shadow-2xl", className)}>
        <FormProvider {...(formProviderProps || form)}>
          <MultiStepFormProvider form={form} config={config} isSubmitting={isSubmitting} isSuccess={isSuccess}>
            <div className="flex h-full">
              <FormSidebar />
              <FormContent
                onSubmit={form.handleSubmit(handleSubmit)}
                onCancel={() => {
                  handleClose()
                  onCancel?.()
                }}
              />
            </div>
          </MultiStepFormProvider>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}

