"use client"

import type React from "react"
import { useFormContext } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { type ComponentProps, useCallback, useEffect, useRef, useState } from "react"

import { useDebounce } from "@uidotdev/usehooks"
import { Eye, EyeOff, type LucideIcon } from "lucide-react"
import brlFormatter from "@/lib/brlF-formatter"
import numberFormatter from "@/lib/number-formatter"
import { cepMask, cnpjMask, cpfMask, phoneMask } from "@/lib/masks"

export default function InputField({
  name,
  label,
  description,
  icon,
  error,
  maxLength,
  maxPercentage,
  suppressError,
  ...props
}: Props) {
  const form = useFormContext()
  const rawValue: number | string = form.watch(name)
  const debouncedValue = useDebounce(rawValue, 500)
  const [alreadyChanged, setAlreadyChanged] = useState(false)
  const [inputValue, setInputValue] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!alreadyChanged) return

    form.trigger(name)
  }, [debouncedValue, form, name, alreadyChanged])

  useEffect(() => {
    if (error && alreadyChanged) {
      form.setError(name, { type: "manual", message: error })
    }
  }, [error, form, name, alreadyChanged])

  // Função para formatar datas para o formato esperado pelo input datetime-local
  const formatDateForInput = (dateString: string): string => {
    if (!dateString) return ""

    try {
      // Se a data termina com Z, converte para o formato local sem o Z
      if (dateString.endsWith("Z")) {
        const date = new Date(dateString)

        // Formata para YYYY-MM-DDThh:mm:ss.sss
        const isoString = date.toISOString()

        // Remove o Z e ajusta para o formato esperado pelo input
        return isoString.substring(0, 19)
      }

      // Se já estiver no formato correto, retorna como está
      return dateString
    } catch (e) {
      console.error("Erro ao formatar data:", e)
      return dateString
    }
  }

  useEffect(() => {
    // Atualiza o valor exibido quando o valor bruto muda
    if (props.type === "money") {
      setInputValue(rawValue !== undefined && rawValue !== null ? brlFormatter.format(Number(rawValue)) : "")
    } else if (props.type === "percent") {
      setInputValue(rawValue !== undefined && rawValue !== null ? `${numberFormatter.format(Number(rawValue))}` : "")
    } else if (props.type === "br-phone") {
      setInputValue(phoneMask(String(rawValue ?? "")))
    } else if (props.type === "cpf") {
      setInputValue(cpfMask(String(rawValue ?? "")))
    } else if (props.type === "cnpj") {
      setInputValue(cnpjMask(String(rawValue ?? "")))
    } else if (props.type === "cep") {
      setInputValue(cepMask(String(rawValue ?? "")))
    } else if (props.type === "number") {
      setInputValue(rawValue !== undefined && rawValue !== null ? String(rawValue) : "")
    } else if (props.type === "datetime-local") {
      // Para campos datetime-local, formata a data corretamente
      setInputValue(rawValue !== undefined && rawValue !== null ? formatDateForInput(String(rawValue)) : "")
    } else {
      setInputValue(rawValue !== undefined && rawValue !== null ? String(rawValue) : "")
    }
  }, [rawValue, props.type])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value

    if (!alreadyChanged) {
      setAlreadyChanged(true)
    }

    if (props.type === "money") {
      const numericValue = input.replace(/\D/g, "")
      const newValue = numericValue ? Number(numericValue) / 100 : undefined
      setInputValue(newValue !== undefined ? brlFormatter.format(newValue) : "")
      form.setValue(name, newValue)
    } else if (props.type === "percent") {
      const numericValue = input.replace(/\D/g, "")

      if (input.endsWith("%")) {
        setInputValue(input)
      } else {
        if (!numericValue) {
          setInputValue("")
          form.setValue(name, undefined)
        } else {
          let newValue = Number(numericValue) / 100

          if (maxPercentage && newValue > maxPercentage) {
            newValue = maxPercentage
          }

          setInputValue(`${numberFormatter.format(newValue)}`)
          form.setValue(name, newValue)
        }
      }
    } else if (props.type === "br-phone") {
      const maskedValue = phoneMask(input)
      setInputValue(maskedValue)
      form.setValue(name, maskedValue || undefined)
    } else if (props.type === "cpf") {
      const maskedValue = cpfMask(input)
      setInputValue(maskedValue)
      form.setValue(name, maskedValue || undefined)
    } else if (props.type === "cnpj") {
      const maskedValue = cnpjMask(input)
      setInputValue(maskedValue)
      form.setValue(name, maskedValue || undefined)
    } else if (props.type === "cep") {
      const maskedValue = cepMask(input)
      setInputValue(maskedValue)
      form.setValue(name, maskedValue || undefined)
    } else if (props.type === "datetime-local") {
      // Para campos datetime-local, use o valor diretamente
      setInputValue(input)
      // Armazena o valor no formato ISO para compatibilidade com o backend
      form.setValue(name, input || undefined)
    } else if (props.type === "only-number") {
      const numericValue = input.replace(/\D/g, "")
      setInputValue(numericValue)
      form.setValue(name, numericValue || undefined)
    } else if (props.type === "number") {
      const numericValue = input.replace(/\D/g, "")
      setInputValue(numericValue)
      form.setValue(name, numericValue ? Number(numericValue) : undefined)
    } else {
      setInputValue(input)
      form.setValue(name, input || undefined)
    }
  }

  const getMaxLength = () => {
    if (props.type === "br-phone") {
      return 15
    }

    if (props.type === "cnpj") {
      return 18
    }

    if (props.type === "cpf") {
      return 14
    }

    if (props.type === "cep") {
      return 9
    }

    return maxLength
  }

  let type = props.type

  if (props.type === "percent" || props.type === "money") {
    type = "text"
  } else if (
    props.type === "br-phone" ||
    props.type === "cnpj" ||
    props.type === "cpf" ||
    props.type === "only-number"
  ) {
    type = "tel"
  }

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev)
  }, [])

  const focusInput = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const Icon = icon
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        // Função para lidar com a referência
        const handleRef = (element: HTMLInputElement | null) => {
          // Atualiza nossa referência local
          inputRef.current = element

          // Passa a referência para o React Hook Form
          if (typeof field.ref === "function") {
            field.ref(element)
          }
        }

        return (
          <FormItem>
            {label && (
              <FormLabel>
                {label}
                {props.required && <span className="text-red-500 ml-0.5">*</span>}
              </FormLabel>
            )}
            <FormControl>
              <div className="relative flex justify-between">
                {Icon && (
                  <Icon
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 cursor-pointer"
                    onClick={focusInput}
                  />
                )}
                <Input
                  {...props}
                  ref={handleRef}
                  maxLength={getMaxLength()}
                  type={props.type === "password" ? (showPassword ? "text" : "password") : type}
                  onChange={handleChange} // Atualiza o valor no input e no formulário
                  value={inputValue} // Mostra o valor formatado
                  className={`${icon ? "pl-10" : ""} py-`}
                  name={field.name}
                  onBlur={field.onBlur}
                />
                {props.type === "password" && (
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                  </button>
                )}
              </div>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            {!suppressError && <FormMessage />}
          </FormItem>
        )
      }}
    />
  )
}

type Props = ComponentProps<"input"> & {
  name: string
  label?: string
  description?: string
  icon?: LucideIcon
  error?: string
  suppressError?: boolean
  type?: Type
  maxPercentage?: number
}

type Type =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week"
  | "percent"
  | "money"
  | "br-phone"
  | "cnpj"
  | "cpf"
  | "cep"
  | "only-number"

export type TextFieldType = Type

