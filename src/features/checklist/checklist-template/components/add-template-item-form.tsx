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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useToast } from "@/components/Toast/toast";
import { useAddChecklistTemplateItem } from "../hooks/use-add-checklist-template-item";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type ChecklistItem = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  templateId: string;
  templateCategoryId: string;
};

export function AddChecklistTemplateItemForm({
  isOpen,
  onOpenChange,
  templateId,
  templateCategoryId,
}: ChecklistItem) {
  const { toast: addToast, ToastComponent } = useToast();

  const handleSucess = () => {
    onOpenChange(false);
  };

  const {
    createChecklistTemplateItemForm,
    handleSubmit,
    control,
    isSubmitting,
    isLoading,
  } = useAddChecklistTemplateItem(
    templateId,
    templateCategoryId,
    addToast,
    handleSucess
  );

  const isPending = isSubmitting || isLoading;
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild className="text-right">
        <Button variant="link">
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Items
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Novo Item</DialogTitle>
        </DialogHeader>
        <Form {...createChecklistTemplateItemForm}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-3 gap-3 w-full">
              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel htmlFor="item-description">
                      Descrição do Item
                    </FormLabel>
                    <FormControl>
                      <div className="flex space-x-2">
                        <Input
                          {...field}
                          placeholder="Ex: Verificar pressão dos pneus"
                          className="flex-grow"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="item-weight">Peso</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={String(field.value)}
                      >
                        <SelectTrigger id="item-weight">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((weight) => (
                            <SelectItem key={weight} value={String(weight)}>
                              Peso {weight}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="item-description">Descrição do Item</Label>
              <Input
                id="item-description"
                placeholder="Ex: Verificar pastilhas de freio"
                value={"Trocar Blusina"}
                onChange={() => {}}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="item-weight">Peso</Label>
                <Select value={"10"} onValueChange={() => {}}>
                  <SelectTrigger id="item-weight">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((weight) => (
                      <SelectItem key={weight} value={String(weight)}>
                        Peso {weight}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div> */}
            {/* <div className="flex items-center justify-between">
            <Label htmlFor="item-comments">Permitir Comentários</Label>
            <Switch
              id="item-comments"
              checked={newItem.hasComments}
              onCheckedChange={(checked) =>
                setNewItem({ ...newItem, hasComments: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="item-attachments">Permitir Anexos</Label>
            <Switch
              id="item-attachments"
              checked={newItem.hasAttachments}
              onCheckedChange={(checked) =>
                setNewItem({ ...newItem, hasAttachments: checked })
              }
            />
          </div> */}
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Adicionando Item ..." : "Adicionar Item"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
      <ToastComponent />
    </Dialog>
  );
}
