import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useCreateBox } from "../../hooks/use-create-box";
import { CustomDialogHeader } from "@/components/CustomDialogHeader";
import InputField from "@/components/forms/input-field";

export function CreateBox() {
  const { form, handleSubmit, isPending, canSubmit } = useCreateBox();

  return (
    <div className="w-full max-w-2xl mx-auto">
      <CustomDialogHeader
        title="Cadastro de Box"
        subtitle="Preencha os campos abaixo para criar um novo box"
      />

      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            id="name"
            name="name"
            type="text"
            label="Nome do Box"
            placeholder="Digite a identificação do box. exemplo: Box 1"
            required
          />
          <InputField
            id="description"
            name="description"
            type="text"
            label="Descrição"
            placeholder="ex: Box para corretivas rápidas"
            required
          />
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Status do Box</FormLabel>
                  <FormDescription>
                    Ative ou desative o box conforme necessário
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
          <Button
            type="submit"
            className="w-full"
            disabled={isPending || !canSubmit}
            isLoading={isPending}
          >
            Cadastrar Box
          </Button>
        </form>
      </Form>
    </div>
  );
}
