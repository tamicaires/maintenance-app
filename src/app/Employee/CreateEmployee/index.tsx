import { useState, useEffect } from "react";
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
import { FormFields, useCreateEmployee } from "../hooks/use-create-employee";
import { useJobTitle } from "@/app/JobTitle/hooks/use-job";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const steps: Array<{
  title: string;
  fields: FormFields[];
  labels: string[];
}> = [
  {
    title: "Informações Pessoais",
    fields: ["name"],
    labels: ["Nome"],
  },
  {
    title: "Informações Profissionais",
    fields: ["workShift", "jobTitleId", "isActive"],
    labels: ["Turno de Trabalho", "Cargo", "Status"],
  },
];

export default function EmployeeCreationDialog() {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const {
    createEmployeeForm,
    handleSubmit,
    isSubmitting,
    isSuccess,
    resetForm,
  } = useCreateEmployee();

  const { data: jobTitlesData } = useJobTitle();
  const jobTitles =
    jobTitlesData?.data?.map((job) => ({
      value: job.id,
      label: job.jobTitle,
    })) || [];

  const { control, trigger } = createEmployeeForm;

  useEffect(() => {
    if (isSuccess) {
      setStep(4);
    }
  }, [isSuccess]);

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
    resetForm();
    setStep(1);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Cadastrar Novo Colaborador</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={handleClose}
      >
        <DialogHeader>
          <DialogTitle>Adicionar Novo Colaborador</DialogTitle>
        </DialogHeader>
        <Form {...createEmployeeForm}>
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
              {step <= 2 && (
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
                            {field === "jobTitleId" ? (
                              <Select
                                onValueChange={(value) =>
                                  formField.onChange(value)
                                }
                                value={formField.value as string}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione um cargo" />
                                </SelectTrigger>
                                <SelectContent>
                                  {jobTitles.map((jobTitle) => (
                                    <SelectItem
                                      key={jobTitle.value}
                                      value={jobTitle.value}
                                    >
                                      {jobTitle.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : field === "isActive" ? (
                              <div className="flex items-center">
                                <Checkbox
                                  checked={formField.value as boolean}
                                  onCheckedChange={(checked) =>
                                    formField.onChange(checked)
                                  }
                                />
                                <Label className="ml-2">Ativo</Label>
                              </div>
                            ) : (
                              <Input {...formField} type="text" />
                            )}
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </motion.div>
              )}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-8"
                >
                  <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">
                    Colaborador Criado com Sucesso!
                  </h3>
                  <p className="text-gray-600">
                    O Colaborador foi adicionado ao sistema
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            <DialogFooter>
              <div className="flex justify-between w-full">
                {step > 1 && step <= 2 && (
                  <Button type="button" onClick={handleBack} variant="outline">
                    <ChevronLeftIcon className="mr-2 h-4 w-4" /> Voltar
                  </Button>
                )}
                {step < 2 && (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="ml-auto"
                  >
                    Próximo <ChevronRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                )}
                {step === 2 && (
                  <Button
                    type="submit"
                    className="ml-auto"
                    disabled={isSubmitting}
                  >
                    Criar Colaborador
                  </Button>
                )}
                {step === 3 && (
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
