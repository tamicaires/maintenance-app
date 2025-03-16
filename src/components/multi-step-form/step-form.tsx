import { motion } from "framer-motion"
import { type Control, type FieldValues, Controller } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import type { FormStep, FormFieldConfig } from "./types"
import { cn } from "@/lib/utils"

interface StepFormProps<T extends FieldValues> {
  step: FormStep<T>
  control: Control<T>
}

const formItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
}

export function StepForm<T extends FieldValues>({ step, control }: StepFormProps<T>) {
  // Verificar se step e step.fieldConfigs existem
  if (!step || !step.fieldConfigs || step.fieldConfigs.length === 0) {
    return <div>Configuração de campos inválida</div>
  }

  // Agrupar campos em pares para layout de duas colunas
  const fieldGroups: Array<FormFieldConfig<T>[]> = []
  let currentGroup: FormFieldConfig<T>[] = []

  step.fieldConfigs.forEach((field, index) => {
    if (field.width === "full") {
      // Se o campo atual for de largura total e já tivermos campos no grupo atual
      if (currentGroup.length > 0) {
        fieldGroups.push([...currentGroup])
        currentGroup = []
      }
      fieldGroups.push([field])
    } else {
      currentGroup.push(field)
      if (currentGroup.length === 2 || index === step.fieldConfigs.length - 1) {
        fieldGroups.push([...currentGroup])
        currentGroup = []
      }
    }
  })

  return (
    <>
      {fieldGroups.map((group, groupIndex) => (
        <div key={groupIndex}>
          {groupIndex > 0 && <Separator className="my-6" />}

          <motion.div
            className={cn(
              "grid gap-5",
              group.length === 1 && group[0].width === "full" ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2",
            )}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  when: "beforeChildren",
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            animate="visible"
          >
            {group.map((fieldConfig) => (
              <motion.div key={fieldConfig.name as string} variants={formItemVariants}>
                <FormField
                  control={control}
                  name={fieldConfig.name as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1.5 text-sm font-medium">
                        {fieldConfig.icon && <fieldConfig.icon className="h-3.5 w-3.5 text-muted-foreground" />}
                        {fieldConfig.label}
                        {fieldConfig.required && <span className="text-destructive">*</span>}
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          {fieldConfig.type === "textarea" ? (
                            <Textarea
                              {...field}
                              placeholder={fieldConfig.placeholder}
                              className={cn(
                                "min-h-[80px]",
                                fieldConfig.icon && "pl-10",
                                "bg-muted/40 border-muted focus-visible:bg-background transition-all",
                              )}
                            />
                          ) : fieldConfig.type === "select" ? (
                            <Controller
                              control={control}
                              name={fieldConfig.name as any}
                              render={({ field: selectField }) => (
                                <Select onValueChange={selectField.onChange} defaultValue={selectField.value}>
                                  <SelectTrigger
                                    className={cn(
                                      "h-11",
                                      fieldConfig.icon && "pl-10",
                                      "bg-muted/40 border-muted focus-visible:bg-background transition-all",
                                    )}
                                  >
                                    <SelectValue placeholder={fieldConfig.placeholder} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {fieldConfig.options?.map((option) => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          ) : fieldConfig.type === "custom" ? (
                            fieldConfig.customComponent
                          ) : (
                            <Input
                              {...field}
                              type={fieldConfig.type}
                              placeholder={fieldConfig.placeholder}
                              className={cn(
                                "h-11",
                                fieldConfig.icon && "pl-10",
                                "bg-muted/40 border-muted focus-visible:bg-background transition-all",
                              )}
                              onChange={(e) => {
                                if (fieldConfig.type === "number") {
                                  field.onChange(Number(e.target.value))
                                } else {
                                  field.onChange(e.target.value)
                                }
                              }}
                            />
                          )}

                          {fieldConfig.icon && (
                            <div className="absolute left-0 top-0 h-full flex items-center justify-center w-10 pointer-events-none">
                              <div className="bg-muted-foreground/10 rounded-md p-1">
                                <fieldConfig.icon className="h-4 w-4 text-muted-foreground" />
                              </div>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      {fieldConfig.description && (
                        <FormDescription className="text-xs">{fieldConfig.description}</FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      ))}
    </>
  )
}

