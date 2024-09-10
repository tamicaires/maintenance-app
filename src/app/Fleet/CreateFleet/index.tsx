import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  CheckCircleIcon,
} from "lucide-react";

const schema = z.object({
  fleetNumber: z.string().min(1, "Número da frota é obrigatório"),
  plate: z.string().regex(/^[A-Z]{3}-\d{4}$/, "Formato de placa inválido"),
  firstTrailerPlate: z
    .string()
    .regex(/^[A-Z]{3}-\d{4}$/, "Formato de placa inválido")
    .optional()
    .or(z.literal("")),
  secondTrailerPlate: z
    .string()
    .regex(/^[A-Z]{3}-\d{4}$/, "Formato de placa inválido")
    .optional()
    .or(z.literal("")),
  thirdTrailerPlate: z
    .string()
    .regex(/^[A-Z]{3}-\d{4}$/, "Formato de placa inválido")
    .optional()
    .or(z.literal("")),
  km: z.string().refine((val) => val === "" || Number(val) >= 0, {
    message: "KM deve ser maior ou igual a 0",
  }),
  carrierName: z.string().min(1, "Transportadora é obrigatória"),
});

type FormData = z.infer<typeof schema>;

const carriers = [
  { value: "carrier1", label: "Carrier 1" },
  { value: "carrier2", label: "Carrier 2" },
  { value: "carrier3", label: "Carrier 3" },
];

const defaultValues: FormData = {
  fleetNumber: "",
  plate: "",
  firstTrailerPlate: "",
  secondTrailerPlate: "",
  thirdTrailerPlate: "",
  km: "",
  carrierName: "",
};

export default function FleetCreationDialog() {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues,
  });

  const {
    formState: { isValid },
    reset,
  } = form;

  const onSubmit = (data: FormData) => {
    console.log("Form submitted with data:", data);
    setStep(4);
  };

  const formatPlate = (value: string) => {
    const cleaned = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    if (cleaned.length <= 3) return cleaned;
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}`;
  };

  const steps = [
    {
      title: "Informações da Frota",
      fields: ["fleetNumber", "plate", "km"],
      labels: ["Frota", "Placa", "KM"],
    },
    {
      title: "Reboques",
      fields: ["firstTrailerPlate", "secondTrailerPlate", "thirdTrailerPlate"],
      labels: ["1º Reboque", "2º Reboque", "3º Reboque"],
    },
    {
      title: "Transportadora",
      fields: ["carrierName"],
      labels: ["Transportadora"],
    },
  ];

  const handleNext = async () => {
    const fieldsToValidate = steps[step - 1].fields as (keyof FormData)[];
    const isStepValid = await form.trigger(fieldsToValidate);
    if (isStepValid) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleClose = () => {
    setOpen(false);
    reset(defaultValues);
    setStep(1);
  };

  useEffect(() => {
    if (!open) {
      handleClose();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Cadastrar Novo</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={handleClose}
      >
        <DialogHeader>
          <DialogTitle>Adicionar Nova Frota</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex justify-between mb-4">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`w-1/3 h-1 rounded-full ${
                    i + 1 <= step ? "bg-primary" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <AnimatePresence mode="wait">
              {step <= 3 && (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold mb-4">
                    {steps[step - 1].title}
                  </h3>
                  {steps[step - 1].fields.map((field, index) => (
                    <FormField
                      key={field}
                      control={form.control}
                      name={field as keyof FormData}
                      render={({ field: formField }) => (
                        <FormItem>
                          <FormLabel>{steps[step - 1].labels[index]}</FormLabel>
                          <FormControl>
                            {field === "carrierName" ? (
                              <Select
                                onValueChange={formField.onChange}
                                value={formField.value as string}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select carrier" />
                                </SelectTrigger>
                                <SelectContent>
                                  {carriers.map((carrier) => (
                                    <SelectItem
                                      key={carrier.value}
                                      value={carrier.value}
                                    >
                                      {carrier.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <Input
                                {...formField}
                                type={field === "km" ? "number" : "text"}
                                onChange={(e) => {
                                  if (field.includes("Plate")) {
                                    const formattedValue = formatPlate(
                                      e.target.value
                                    );
                                    formField.onChange(formattedValue);
                                    e.target.value = formattedValue;
                                  } else if (field === "km") {
                                    formField.onChange(e.target.value);
                                  } else {
                                    formField.onChange(e.target.value);
                                  }
                                }}
                              />
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </motion.div>
              )}
              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-8"
                >
                  <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">
                    Frota Criada com Sucesso!
                  </h3>
                  <p className="text-gray-600">
                    Frota foi adicionada ao sistema
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            <DialogFooter>
              <div className="flex justify-between w-full">
                {step > 1 && step <= 3 && (
                  <Button type="button" onClick={handleBack} variant="outline">
                    <ChevronLeftIcon className="mr-2 h-4 w-4" /> Voltar
                  </Button>
                )}
                {step < 3 && (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="ml-auto"
                  >
                    Próximo <ChevronRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                )}
                {step === 3 && (
                  <Button type="submit" className="ml-auto" disabled={!isValid}>
                    Criar Frota
                  </Button>
                )}
                {step === 4 && (
                  <Button
                    type="button"
                    onClick={handleClose}
                    className="mx-auto"
                  >
                    Fechar
                  </Button>
                )}
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
