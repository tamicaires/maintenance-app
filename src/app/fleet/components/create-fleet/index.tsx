import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Select } from "@/components/custom-combobox";
import { useCreateFleet } from "../../hooks/use-create-fleet";
import { Loader2, Plus } from "lucide-react";
import { useCarrier } from "@/app/carriers/hooks/use-carrier";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CustomDialogHeader } from "@/components/CustomDialogHeader";
import { SuccessMessage } from "@/components/SucessMessage";
import { useNotification } from "@/components/notification-card/notification-card";
import { useState } from "react";

type FleetCreationProps = {
  trigger: React.ReactNode;
};

export function FleetCreationDialog({ trigger }: FleetCreationProps) {
  const { showNotification, NotificationComponent } = useNotification();
  const {
    createFleetForm,
    handleSubmit,
    isPending,
    step,
    setStep,
    open,
    setOpen,
    reset,
    control,
  } = useCreateFleet(showNotification);

  const { data: carrierData } = useCarrier();
  const carriers =
    carrierData?.data?.map((carrier) => ({
      value: carrier.id,
      label: carrier.carrierName,
    })) || [];

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      reset();
      setOpen(false);
      console.log("fechando ....");
      setStep(1);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Cadastrar Frota
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          {step === 1 && (
            <CustomDialogHeader
              title="Cadastro de Frota"
              subtitle="Preencha os campos abaixo para criar uma nova frota"
            />
          )}
          {step === 1 && (
            <Form {...createFleetForm}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <FormField
                  control={control}
                  name="fleetNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número da Frota</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Digite o número da frota"
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
                  control={control}
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
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Criando Frota...
                    </>
                  ) : (
                    "Criar Frota"
                  )}
                </Button>
              </form>
            </Form>
          )}
          {step === 2 && (
            <SuccessMessage
              title="Frota Cadastrada com Sucesso!"
              message="A frota foi adicionada ao sistema"
              onClose={() => handleOpenChange(false)}
            />
          )}
        </DialogContent>
        <NotificationComponent />
      </Dialog>
    </div>
  );
}
