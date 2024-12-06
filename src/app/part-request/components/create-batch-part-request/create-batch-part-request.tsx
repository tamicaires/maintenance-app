import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/CustomCombobox";
import { Loader2, Plus, Trash2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/Form/custom-form";
import { CustomDialogHeader } from "@/components/CustomDialogHeader";
import { RequestStatus } from "@/shared/enums/part-request";
import { toast } from "sonner";
import RequiredIndicator from "@/components/RequiredIndicator";
import { PartRequestItem } from "@/validations/create-part-request-batch";
import { IActiveTrailer } from "@/shared/types/trailer.interface";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import EmptyState from "@/components/EmptyState";
import { useParts } from "@/app/part-manager/hooks/use-parts";
import { useCreatePartRequestBatch } from "@/app/part-request/hooks/use-create-part-request-batch";
import { usePartRequestItems } from "../../hooks/use-handle-item";

type BatchPartRequestDialogProps = {
  workOrderDisplayId?: string;
  workOrderId: string;
  trailers: IActiveTrailer[];
};

export function BatchPartRequestDialog({
  workOrderDisplayId,
  workOrderId,
  trailers,
}: BatchPartRequestDialogProps) {
  const { data: partsData } = useParts();
  const parts = partsData?.data || [];

  const { isSubmitting, isOpen, setIsOpen, handleCreateRequest, isLoading } =
    useCreatePartRequestBatch();

  const { items, addItem, removeItem } = usePartRequestItems();

  const [currentItem, setCurrentItem] = useState<PartRequestItem>({
    partId: "",
    requestedForEmployeeId: null,
    quantity: 1,
    status: RequestStatus.PENDING,
    axleId: null,
    trailerId: "",
    workOrderId: workOrderId,
  });

  const handleAddCurrentItem = () => {
    if (
      !currentItem.partId ||
      !currentItem.quantity ||
      !currentItem.trailerId
    ) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }
    addItem(currentItem);
    setCurrentItem({
      ...currentItem,
      partId: "",
      trailerId: "",
      quantity: 1,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Solicitar Peça
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">
            Solicitação de Peças em Lote
          </DialogTitle>
          <CustomDialogHeader
            title="Solicitação de Peças"
            subtitle={`OS: ${workOrderDisplayId}`}
          />
        </DialogHeader>

        <Form onSubmit={(e) => e.preventDefault()} className="max-h-[90vh]">
          <div className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4">
                <FormField name="partId">
                  <FormItem>
                    <FormLabel>
                      Peça <RequiredIndicator />
                    </FormLabel>
                    <FormControl>
                      <Select
                        options={parts.map((part) => ({
                          value: part.id,
                          label: part.name,
                          description: `NI-${part.partNumber}`,
                        }))}
                        isFiltered
                        placeholder="Selecione uma peça"
                        value={currentItem.partId}
                        onChange={(value) =>
                          setCurrentItem((prev) => ({ ...prev, partId: value }))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
                <FormField name="quantity">
                  <FormItem>
                    <FormLabel>
                      Quantidade <RequiredIndicator />{" "}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        value={currentItem.quantity}
                        onChange={(e) =>
                          setCurrentItem((prev) => ({
                            ...prev,
                            quantity: Number(e.target.value),
                          }))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
                <FormField name="trailerId">
                  <FormItem>
                    <FormLabel>
                      Reboque <RequiredIndicator />{" "}
                    </FormLabel>
                    <FormControl>
                      <Select
                        options={trailers.map((trailer) => ({
                          value: trailer.id,
                          label: `SR${trailer.position}`,
                          description: trailer.plate,
                        }))}
                        isFiltered
                        placeholder="Selecione um reboque..."
                        value={currentItem.trailerId}
                        onChange={(value) =>
                          setCurrentItem((prev) => ({
                            ...prev,
                            trailerId: value,
                          }))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
                <FormField name="axleId">
                  <FormItem>
                    <FormLabel>Eixo </FormLabel>
                    <FormControl>
                      <Select
                        options={
                          currentItem.trailerId
                            ? trailers
                                .find((t) => t.id === currentItem.trailerId)
                                ?.axles.map((axle) => ({
                                  value: axle.id,
                                  label: axle.position,
                                })) || []
                            : []
                        }
                        isFiltered
                        disabled={!currentItem.trailerId}
                        placeholder="Selecione um eixo"
                        value={currentItem.trailerId}
                        onChange={(value) =>
                          setCurrentItem((prev) => ({
                            ...prev,
                            trailerId: value,
                          }))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </div>
              <Button
                type="button"
                variant="default"
                onClick={handleAddCurrentItem}
                className="mt-4 w-full"
              >
                Adicionar Item
              </Button>
            </div>

            <ScrollArea>
              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Peça</TableHead>
                      <TableHead className="w-[100px] text-left">
                        Quant.
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Reboque
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Eixo
                      </TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="text-center text-muted-foreground h-[200px]"
                        >
                          <EmptyState message="Nenhum item adicionado" />
                        </TableCell>
                      </TableRow>
                    ) : (
                      items.map((item, index) => {
                        const part = parts.find((p) => p.id === item.partId);
                        const trailer = trailers.find(
                          (t) => t.id === item.trailerId
                        );
                        const axlePosition =
                          trailer?.axles?.find(
                            (axle) => axle.id === item.axleId
                          )?.position || null;
                        return (
                          <TableRow key={index}>
                            <TableCell>
                              {part ? part.name : "Peça não encontrada"}
                            </TableCell>{" "}
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>
                              {trailer
                                ? `SR${trailer.position}`
                                : "Reboque não encontrado"}
                            </TableCell>{" "}
                            <TableCell>
                              {axlePosition ? `${axlePosition}` : "-"}
                            </TableCell>{" "}
                            <TableCell>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground hover:text-red-500"
                                onClick={() => removeItem(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="w-full sm:w-auto"
              >
                Cancelar
              </Button>
              <Button
                type="button"
                onClick={() => handleCreateRequest({ batchData: items })}
                disabled={isSubmitting}
              >
                {isSubmitting || isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  "Criar Solicitação"
                )}
              </Button>
            </div>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
