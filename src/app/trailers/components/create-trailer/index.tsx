import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCreateTrailer } from "@/app/trailers/hooks/use-create-trailer";
import { useFleet } from "@/app/fleet/hooks/use-fleet";
import type { IFleet } from "@/shared/types/fleet.interface";
import { useNotification } from "@/components/notification-card/notification-card";
import { Switch } from "@/components/ui/switch";
import RequiredIndicator from "@/components/RequiredIndicator";

interface ITrailerCreationDialogProps {
  trigger?: React.ReactNode;
}

export function TrailerCreationDialog({
  trigger,
}: ITrailerCreationDialogProps) {
  const { showNotification, NotificationComponent } = useNotification();
  const [isFleetSelected, setIsFleetSelected] = useState<boolean>(false);

  const {
    createTrailerForm,
    handleSubmit,
    isSubmitting,
    isPending,
    resetForm,
    isCreateTrailerDialogOpen,
    setIsCreateTrailerDialogOpen,
  } = useCreateTrailer({ showNotification });

  const { data: fleetsData } = useFleet();
  const fleets =
    fleetsData?.fleets.map((fleet: IFleet) => ({
      value: fleet.id,
      label: fleet.fleetNumber,
    })) || [];

  const { control, watch } = createTrailerForm;
  const watchFleetId = watch("fleetId");

  useEffect(() => {
    setIsFleetSelected(!!watchFleetId);
  }, [watchFleetId]);

  const handleClose = () => {
    setIsCreateTrailerDialogOpen(false);
    resetForm();
  };

  return (
    <Dialog
      open={isCreateTrailerDialogOpen}
      onOpenChange={setIsCreateTrailerDialogOpen}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={handleClose}
      >
        <DialogHeader>
          <DialogTitle>Adicionar Reboque</DialogTitle>
          <DialogDescription>Preencha os dados para cadastro</DialogDescription>
        </DialogHeader>
        <Form {...createTrailerForm}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <FormField
                control={control}
                name="plate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Placa <RequiredIndicator />
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
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
                        Status do Reboque
                      </FormLabel>
                      <FormDescription>
                        Ative ou desative o reboque conforme necessário
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
                name="fleetId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frota</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value === "none" ? null : value);
                        setIsFleetSelected(value !== "none");
                      }}
                      value={field.value || "none"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma frota (opcional)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">Nenhuma frota</SelectItem>
                        {fleets.map((fleet) => (
                          <SelectItem key={fleet.value} value={fleet.value}>
                            {fleet.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isFleetSelected && (
                <FormField
                  control={control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Posição na Frota</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </motion.div>
            <DialogFooter>
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || isPending}
              >
                {isSubmitting || isPending
                  ? "Adicionando..."
                  : "Adicionar Reboque"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
      <NotificationComponent />
    </Dialog>
  );
}
