"use client"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"

interface DateTimeFieldProps {
  name: string
  label: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
}

/**
 * Componente de campo de data e hora que usa useFormContext internamente
 * e lida com a conversão entre string e Date para compatibilidade com o Zod
 */
export function DateTimeField({ name, label, placeholder, disabled = false, required = false }: DateTimeFieldProps) {
  // Obtém o contexto do formulário diretamente
  const formContext = useFormContext()

  if (!formContext) {
    throw new Error("DateTimeField deve ser usado dentro de um FormProvider")
  }

  const { control } = formContext

  // Função para formatar Date para string no formato esperado pelo input datetime-local
  const formatDateForInput = (date: Date | string | null | undefined): string => {
    if (!date) return ""

    try {
      const dateObj = typeof date === "string" ? new Date(date) : date

      if (isNaN(dateObj.getTime())) return ""

      // Formato YYYY-MM-DDThh:mm para inputs datetime-local
      return dateObj.toISOString().slice(0, 16)
    } catch (error) {
      console.error("Error formatting date:", error)
      return ""
    }
  }

  // Função para converter string do input para Date ou string ISO
  const parseInputValue = (value: string): Date | string | undefined => {
    if (!value) return undefined

    try {
      const date = new Date(value)

      // Se a data for válida, retorna o objeto Date
      // Caso contrário, retorna a string original para que o Zod possa validar
      return isNaN(date.getTime()) ? value : date
    } catch (error) {
      console.error("Error parsing date:", error)
      return value // Retorna a string original em caso de erro
    }
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value, ...fieldProps } }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              type="datetime-local"
              placeholder={placeholder}
              disabled={disabled}
              value={formatDateForInput(value)}
              onChange={(e) => onChange(parseInputValue(e.target.value))}
              {...fieldProps}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

