import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { FormFields, useUpdateEmployee } from "../hooks/use-update-employee";
import { useJobTitle } from "@/app/JobTitle/hooks/use-job";
import { IEmployee } from "@/shared/types/employee.interface";

const steps: Array<{
  title: string;
  fields: (keyof FormFields)[];
  labels: string[];
}> = [
  {
    title: "Informações Pessoais",
    fields: ["name"],
    labels: ["Nome"],
  },
  {
    title: "Informações Profissionais",
    fields: ["workShift", "jobTitleId"],
    labels: ["Turno de Trabalho", "Cargo"],
  },
  {
    title: "Status",
    fields: ["status"],
    labels: ["Status"],
  },
];

export default function EmployeeEditDialog({
  employee,
  onClose,
}: {
  employee: IEmployee;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const {
    form,
    handleSubmit,
    isSubmitting,
    handleEdit,
    editingEmployee,
    isSuccess,
    setIsSuccess,
  } = useUpdateEmployee(onClose);

  const { data: jobTitlesData } = useJobTitle();

  const jobTitles =
    jobTitlesData?.data?.map((job) => ({
      value: job.id.toString(),
      label: job.jobTitle,
    })) || [];

  const { control, trigger } = form;

  useEffect(() => {
    if (employee && !editingEmployee) {
      handleEdit(employee);
    }
  }, [employee, handleEdit, editingEmployee]);

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
    onClose();
    setStep(1);
    setIsSuccess(false);
  };

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Funcionário</DialogTitle>
        </DialogHeader>
        <Form {...form}>
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
                            {field === "jobTitleId" ? (
                              <Select
                                onValueChange={formField.onChange}
                                value={formField.value?.toString()}
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
                            ) : field === "status" ? (
                              <Select
                                onValueChange={formField.onChange}
                                value={formField.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione o status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="ATIVO">ATIVO</SelectItem>
                                  <SelectItem value="INATIVO">
                                    INATIVO
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            ) : (
                              <Input {...formField} />
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
                    Colaborador Atualizado com Sucesso!
                  </h3>
                  <p className="text-gray-600">
                    As informações do colaborador foram atualizadas no sistema
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
                    Atualizar Funcionário
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
