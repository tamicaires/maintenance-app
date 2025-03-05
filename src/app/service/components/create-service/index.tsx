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
import { CheckCircleIcon } from "lucide-react";
import { FormFields, useCreateService } from "../../hooks/use-create-service";
import { ServiceCategory } from "@/shared/enums/service";

const steps: Array<{
  title: string;
  fields: FormFields[];
  labels: string[];
}> = [
  {
    title: "Informações do Serviço",
    fields: ["serviceName", "serviceCategory"],
    labels: ["Nome do Serviço", "Categoria do Serviço"],
  },
];

export default function ServiceCreationDialog() {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const {
    createServiceForm,
    handleSubmit,
    isSubmitting,
    isSuccess,
    resetForm,
  } = useCreateService();

  const { control } = createServiceForm;

  useEffect(() => {
    if (isSuccess) {
      setStep(2);
    }
  }, [isSuccess]);

  const handleClose = () => {
    setOpen(false);
    resetForm();
    setStep(1);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">Cadastrar Novo Serviço</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={handleClose}
      >
        <DialogHeader>
          <DialogTitle>Adicionar Novo Serviço</DialogTitle>
        </DialogHeader>
        <Form {...createServiceForm}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {step === 1 && (
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
                            {field === "serviceCategory" ? (
                              <Select
                                onValueChange={formField.onChange}
                                defaultValue={formField.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione a categoria" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Object.values(ServiceCategory).map(
                                    (category) => (
                                      <SelectItem
                                        key={category}
                                        value={category}
                                      >
                                        {category}
                                      </SelectItem>
                                    )
                                  )}
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
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-8"
                >
                  <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">
                    Serviço Criado com Sucesso!
                  </h3>
                  <p className="text-gray-600">
                    O Serviço foi adicionado ao sistema
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            <DialogFooter>
              <div className="flex justify-between w-full">
                {step === 1 && (
                  <Button
                    type="submit"
                    className="ml-auto"
                    disabled={isSubmitting}
                  >
                    Criar Serviço
                  </Button>
                )}
                {step === 2 && (
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
