import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Switch } from "../ui/switch";

interface SwitchFieldProps {
  name: string;
  label: string;
  description: string;
  disabled?: boolean;
  required?: boolean;
}

export function SwitchField({
  name,
  label,
  description = "Ative ou desative conforme necessário",
  disabled = false,
  required = false,
}: SwitchFieldProps) {
  const formContext = useFormContext();

  if (!formContext) {
    throw new Error("SwitchField deve ser usado dentro de um FormProvider");
  }

  const { control } = formContext;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormLabel className="text-base">
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
