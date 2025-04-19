"use client"

import type React from "react"
import { useFormContext } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { type ComponentProps, useCallback, useRef, useState } from "react"
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
  const rawValue = form.watch(name)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  // Format the value for display based on type
  const formatValue = useCallback((value: any, type?: string): string => {
    if (value === undefined || value === null) return ""

    switch (type) {
      case "money":
        return brlFormatter.format(Number(value))
      case "percent":
        return `${numberFormatter.format(Number(value))}`
      case "br-phone":
        return phoneMask(String(value))
      case "cpf":
        return cpfMask(String(value))
      case "cnpj":
        return cnpjMask(String(value))
      case "cep":
        return cepMask(String(value))
      case "datetime-local":
        return formatDateForInput(String(value))
      default:
        return String(value)
    }
  }, [])

  // Format date for datetime-local input
  const formatDateForInput = (dateString: string): string => {
    if (!dateString) return ""
    try {
      if (dateString.endsWith("Z")) {
        const date = new Date(dateString)
        const isoString = date.toISOString()
        return isoString.substring(0, 19)
      }
      return dateString
    } catch (e) {
      console.error("Erro ao formatar data:", e)
      return dateString
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value
    let processedValue: any = input

    switch (props.type) {
      case "money":
        const numericMoney = input.replace(/\D/g, "")
        processedValue = numericMoney ? Number(numericMoney) / 100 : undefined
        break
      case "percent":
        const numericPercent = input.replace(/\D/g, "")
        if (!numericPercent) {
          processedValue = undefined
        } else {
          let newValue = Number(numericPercent) / 100
          if (maxPercentage && newValue > maxPercentage) {
            newValue = maxPercentage
          }
          processedValue = newValue
        }
        break
      case "br-phone":
        processedValue = phoneMask(input) || undefined
        break
      case "cpf":
        processedValue = cpfMask(input) || undefined
        break
      case "cnpj":
        processedValue = cnpjMask(input) || undefined
        break
      case "cep":
        processedValue = cepMask(input) || undefined
        break
      case "only-number":
        processedValue = input.replace(/\D/g, "") || undefined
        break
      case "number":
        const numericValue = input.replace(/\D/g, "")
        processedValue = numericValue ? Number(numericValue) : undefined
        break
      default:
        processedValue = input || undefined
    }

    form.setValue(name, processedValue, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const getMaxLength = () => {
    if (props.type === "br-phone") return 15
    if (props.type === "cnpj") return 18
    if (props.type === "cpf") return 14
    if (props.type === "cep") return 9
    return maxLength
  }

  // Determine input type
  const getInputType = () => {
    if (props.type === "password") {
      return showPassword ? "text" : "password"
    }

    if (["percent", "money"].includes(props.type || "")) {
      return "text"
    }

    if (["br-phone", "cnpj", "cpf", "only-number", "cep"].includes(props.type || "")) {
      return "tel"
    }

    return props.type
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
      render={({ field }) => (
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
                ref={(element) => {
                  inputRef.current = element
                  if (typeof field.ref === "function") {
                    field.ref(element)
                  }
                }}
                maxLength={getMaxLength()}
                type={getInputType()}
                onChange={handleChange}
                value={formatValue(rawValue, props.type)}
                className={`${icon ? "pl-10" : ""}`}
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
      )}
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
