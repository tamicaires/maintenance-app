import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { FormFields, useCreateFleet } from "../hooks/use-create-fleet";
import { useCarrier } from "@/app/Carrier/hooks/use-carrier";

const steps: Array<{
  title: string;
  fields: FormFields[];
  labels: string[];
}> = [
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
    fields: ["carrierId"],
    labels: ["Transportadora"],
  },
];

export default function FleetCreationDialog() {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const { createFleetForm, handleSubmit, isSubmitting, formatPlate } =
    useCreateFleet(setOpen);

  const { data: fleetData } = useCarrier();
  const carriers =
    fleetData?.data?.map((carrier) => ({
      value: carrier.id,
      label: carrier.carrierName,
    })) || [];

  const { control, trigger } = createFleetForm;

  const handleNext = async () => {
    const fieldsToValidate = steps[step - 1].fields;
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleClose = () => {
    setOpen(false);
    createFleetForm.reset();
    setStep(1);
  };

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
        <Form {...createFleetForm}>
          <form onSubmit={handleSubmit} className="space-y-4">
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
                      control={control}
                      name={field}
                      render={({ field: formField }) => (
                        <FormItem>
                          <FormLabel>{steps[step - 1].labels[index]}</FormLabel>
                          <FormControl>
                            {field === "carrierId" ? (
                              <Select
                                onValueChange={formField.onChange}
                                value={formField.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione uma transportadora" />
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
                  <Button
                    type="submit"
                    className="ml-auto"
                    disabled={isSubmitting}
                  >
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
