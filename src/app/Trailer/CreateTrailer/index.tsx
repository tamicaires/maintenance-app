import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CheckCircleIcon } from "lucide-react";
import { useCreateTrailer } from "@/app/Trailer/hooks/use-create-trailer";
import { Checkbox } from "@/components/ui/checkbox";
import { useFleet } from "@/app/Fleet/hooks/use-fleet";
import { IFleet } from "@/interfaces/fleet.interface";

interface ITrailerCreationDialogProps {
  isOpen?: boolean;
}

export default function TrailerCreationDialog({ isOpen = false }: ITrailerCreationDialogProps) {
  const [open, setOpen] = useState(isOpen);
  const [fleetSelected, setFleetSelected] = useState(false);
  const {
    createTrailerForm,
    handleSubmit,
    isSubmitting,
    isSuccess,
    resetForm,
  } = useCreateTrailer();

  const { data: fleetsData } = useFleet();
  const fleets =
    fleetsData?.data?.map((fleet: IFleet) => ({
      value: fleet.id,
      label: fleet.fleetNumber,
    })) || [];

  const { control, watch } = createTrailerForm;
  const watchFleetId = watch("fleetId");

  useEffect(() => {
    setFleetSelected(!!watchFleetId);
  }, [watchFleetId]);

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Cadastrar Novo Trailer</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={handleClose}
      >
        <DialogHeader>
          <DialogTitle>Adicionar Novo Trailer</DialogTitle>
        </DialogHeader>
        <Form {...createTrailerForm}>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex gap-3">
                  <FormField
                    control={control}
                    name="plate"
                    render={({ field }) => (
                      <FormItem className="w-2/3">
                        <FormLabel>Placa</FormLabel>
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
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md  p-4 mt-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Ativo</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={control}
                  name="fleetId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frota</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value === "none" ? null : value);
                          setFleetSelected(value !== "none");
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
                {fleetSelected && (
                  <FormField
                    control={control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Posição na Frota</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-8"
              >
                <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">
                  Trailer Criado com Sucesso!
                </h3>
                <p className="text-gray-600">
                  O Trailer foi adicionado ao sistema
                </p>
              </motion.div>
            )}
            <DialogFooter>
              {!isSuccess ? (
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Criando..." : "Criar Trailer"}
                </Button>
              ) : (
                <Button type="button" onClick={handleClose} className="w-full">
                  Fechar
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
