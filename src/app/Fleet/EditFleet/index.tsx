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
import { Select } from "@/components/CustomCombobox"
import { useUpdateFleet } from "../hooks/use-update-fleet"
import { Loader2, Pencil } from "lucide-react"
import { useCarrier } from "@/app/Carrier/hooks/use-carrier"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { CustomDialogHeader } from "@/components/CustomDialogHeader"
import { IFleet } from "@/shared/types/fleet.interface"

export default function UpdateFleetDialog({ fleet }: { fleet: IFleet }) {
  const {
    form,
    handleSubmit,
    isSubmitting,
    handleEdit,
    open,
    setOpen,
    setEditingFleet,
  } = useUpdateFleet(() => setOpen(false))

  const { data: carrierData } = useCarrier()
  const carriers =
    carrierData?.data?.map((carrier) => ({
      value: carrier.id,
      label: carrier.carrierName,
    })) || []

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      form.reset()
      setEditingFleet(null)
    }
  }

  return (  
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" onClick={() => handleEdit(fleet)}>
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <CustomDialogHeader
          title="Atualizar Frota"
          subtitle="Atualize os detalhes da frota selecionada"
        />
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              control={form.control}
              name="fleetNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número da Frota</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Digite o número da frota" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Status da Frota
                    </FormLabel>
                    <FormDescription>
                      Ative ou desative a frota conforme necessário
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
            <FormField
              control={form.control}
              name="carrierId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transportadora</FormLabel>
                  <Select
                    onChange={(value) => field.onChange(value)}
                    value={field.value}
                    options={carriers}
                    isFiltered
                    placeholder="Selecione uma transportadora"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Atualizando Frota...
                </>
              ) : (
                "Atualizar Frota"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}