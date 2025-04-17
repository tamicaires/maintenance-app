import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCreateChecklistTemplateCategory } from "../hooks/use-create-template-category";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type CategoryProps = {
  templateId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AddTemplateCategory({
  templateId,
  isOpen,
  onOpenChange,
}: CategoryProps) {
  // const { addToast } = useToast();

  const {
    form,
    handleSubmit,
    canSubmit,
    isPending,
    isCreateCategoryOpen,
    setIsCreateCategoryOpen,
  } = useCreateChecklistTemplateCategory(templateId, isOpen);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Categoria
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Nova Categoria</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="area-name">Nome da Categoria</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Ex: Freios, Pneumáticos, etc."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="area-name">
                    Descrição (opcional)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Breve descrição da categoria"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <div className="space-y-2">
              <Label htmlFor="area-name">Nome da Área</Label>
              <Input
                id="area-name"
                placeholder="Ex: Freios, Pneumáticos, etc."
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="area-description">Descrição (opcional)</Label>
              <Textarea
                id="area-description"
                placeholder="Breve descrição da área"
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    description: e.target.value,
                  })
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
              <Button
                type="submit"
                disabled={isPending || !canSubmit}
                isLoading={isPending}
              >
                Adicionar Categoria
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
      {/* <ToastComponent /> */}
    </Dialog>
  );
}
