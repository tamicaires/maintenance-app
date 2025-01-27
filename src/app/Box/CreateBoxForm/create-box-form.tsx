import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useCreateBox } from "../hooks/use-create-box"
import { Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { CustomDialogHeader } from "@/components/CustomDialogHeader"
import { SuccessMessage } from "@/components/SucessMessage"

export function BoxCreationDialog() {
  const {
    createBoxForm,
    handleSubmit,
    isPending,
    step,
    setStep,
    open,
    setOpen,
    reset,
    control
  } = useCreateBox()

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      reset()
      console.log("fechando ....")
      setStep(1)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button>
            Criar Novo Box
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          {step === 1 && (
            <CustomDialogHeader
              title="Cadastro de Box"
              subtitle="Preencha os campos abaixo para criar um novo box"
            />
          )}
          {step === 1 && (
            <Form {...createBoxForm}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Box</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Digite a identificação do box. exemplo: Box 1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Digite a descrição do box"
                          value={field.value || ''}
                          onChange={(e) => field.onChange(e.target.value || null)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Status do Box
                        </FormLabel>
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
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Criando Box...
                    </>
                  ) : (
                    "Criar Box"
                  )}
                </Button>
              </form>
            </Form>
          )}
          {step === 2 && (
            <SuccessMessage
              title="Box Cadastrado com Sucesso!"
              message="O box foi adicionado ao sistema"
              onClose={() => handleOpenChange(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}