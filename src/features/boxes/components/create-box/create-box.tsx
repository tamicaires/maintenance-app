import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useCreateBox } from "../../hooks/use-create-box";
import { CustomDialogHeader } from "@/components/CustomDialogHeader";
import InputField from "@/components/forms/input-field";
import { SwitchField } from "@/components/forms/switch-input";

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
          />
          <SwitchField
            name="isActive"
            description="Ative ou desative o box conforme necessário"
            label="Status do Box"
            required
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
