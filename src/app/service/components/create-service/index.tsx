import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
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
import { useCreateService } from "../../hooks/use-create-service";
import { ServiceCategory } from "@/shared/enums/service";
import { CustomDialogHeader } from "@/components/CustomDialogHeader";

export default function ServiceCreationDialog() {
  const {
    createServiceForm,
    handleSubmit,
    isSubmitting,
    isPending,
    resetForm,
    isCreateServiceOpen,
    setIsCreateServiceOpen,
  } = useCreateService();

  const { control } = createServiceForm;

  const handleClose = () => {
    setIsCreateServiceOpen(false);
    resetForm();
  };

  return (
    <Dialog open={isCreateServiceOpen} onOpenChange={setIsCreateServiceOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">Cadastrar Novo Serviço</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={handleClose}
      >
        <DialogTitle hidden>Cadastro de Serviços</DialogTitle>
        <CustomDialogHeader
          title="Cadastro de Serviços"
          subtitle="Preencha os campos abaixo para criar um novo serviço"
        />
        <Form {...createServiceForm}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <FormField
                  control={control}
                  name="serviceName"
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel>Nome do Serviço</FormLabel>
                      <FormControl>
                        <Input {...formField} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <FormField
                  control={control}
                  name="serviceCategory"
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel>Categoria do Serviço</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={formField.onChange}
                          defaultValue={formField.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(ServiceCategory).map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <FormField
                  control={control}
                  name="weight"
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel>Peso do Serviço</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) =>
                            formField.onChange(Number(value))
                          }
                          defaultValue={String(formField.value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o peso" />
                          </SelectTrigger>
                          <SelectContent>
                            {[0.5, 1, 1.5, 2, 2.5].map((weight) => (
                              <SelectItem key={weight} value={String(weight)}>
                                {weight}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            </AnimatePresence>
            <DialogFooter>
              <div className="flex justify-between w-full">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting || isPending}
                >
                  {isSubmitting || isPending
                    ? "Cadastrando..."
                    : "Cadastrar Serviço"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
