import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/CustomDialog";
import { useCreateCarrier } from "../hooks/use-create-carrier";
import { Checkbox } from "@/components/ui/checkbox";

interface CreateCarrierProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}

export function CreateCarrier({
  isDialogOpen,
  setIsDialogOpen,
}: CreateCarrierProps) {
  const { createCarrierForm, handleSubmit, isSubmitting } =
    useCreateCarrier(setIsDialogOpen);

  const closeDialog = () => setIsDialogOpen(false);

  return (
    <Dialog
      title="Cadastro de Transportadora"
      description="Preencha os dados da transportadora aqui."
      isOpen={isDialogOpen}
      onClose={closeDialog}
      confirmText="Cadastrar"
      cancelText="Cancelar"
    >
      <Form {...createCarrierForm}>
        <form
          onSubmit={handleSubmit}
          className="space-y-8 pt-2 min-w-80 sm:min-w-96"
        >
          <FormField
            control={createCarrierForm.control}
            name="carrierName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Transportadora</FormLabel>
                <FormControl>
                  <Input placeholder="Nome da Transportadora" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createCarrierForm.control}
            name="managerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Responsável</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do Responsável" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createCarrierForm.control}
            name="managerPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contato Responsável</FormLabel>
                <FormControl>
                  <Input placeholder="Telefone do Responsável" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createCarrierForm.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex items-center justify-end space-x-2">
                <FormControl className="mt-2">
                  <Checkbox
                    id="status"
                    size="small"
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked ? true : false);
                    }}
                  />
                </FormControl>
                <FormLabel
                  htmlFor="status-active"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
                >
                  Ativo
                </FormLabel>
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              Cadastrar
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </Dialog>
  );
}
