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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCreateEmployee } from "@/features/employee/hooks/use-create-employee";
import { useJobTitle } from "@/features/JobTitle/hooks/use-job";
import { Input } from "@/components/ui/input";
import { CustomDialogHeader } from "@/components/CustomDialogHeader";
import { Switch } from "@/components/ui/switch";

export default function EmployeeCreationDialog() {
  const {
    createEmployeeForm,
    handleSubmit,
    isSubmitting,
    isPending,
    isCreateEmployeeOpen,
    setIsCreateEmployeeOpen,
    resetForm,
  } = useCreateEmployee();

  const { data: jobTitlesData } = useJobTitle();
  const jobTitles =
    jobTitlesData?.data?.map((job) => ({
      value: job.id,
      label: job.jobTitle,
    })) || [];

  const { control } = createEmployeeForm;

  const handleClose = () => {
    setIsCreateEmployeeOpen(false);
    resetForm();
  };

  return (
    <Dialog open={isCreateEmployeeOpen} onOpenChange={setIsCreateEmployeeOpen}>
      <DialogTrigger asChild>
        <Button>Cadastrar Novo Profissional</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={handleClose}
      >
        <DialogHeader>
          <DialogTitle hidden>Adicionar Novo Colaborador</DialogTitle>
          <CustomDialogHeader
            title="Cadastro de Profissional Técnico"
            subtitle="Preencha os campos abaixo para criar um novo serviço"
          />
        </DialogHeader>
        <Form {...createEmployeeForm}>
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Profissional</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
              <div className="flex gap-5 w-full">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <FormField
                    control={control}
                    name="workShift"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Turno de Trabalhos</FormLabel>
                        <FormControl>
                          <Input {...field} type="text" />
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
                    name="jobTitleId"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Cargo</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            value={field.value as string}
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
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <FormField
                  control={control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Status do Profissional
                        </FormLabel>
                        <FormDescription>
                          Ative ou desative o profissional conforme necessário
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
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
                    : "Cadastrar Profissional"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
