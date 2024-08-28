import { FileIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog } from "@/components/CustomDialog";
import { StatusTimelime } from "@/components/OrderDetails/StatusTimeline";
import { OrderServices } from "@/components/OrderDetails/OrderServices";
import { OrderHistory } from "@/components/OrderDetails/OrderHistory";
import { OrderParts } from "@/components/OrderDetails/Parts";

interface OrderDetailsProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
}

export function OrderDetails({
  isDialogOpen,
  setIsDialogOpen,
}: OrderDetailsProps) {
  if (!isDialogOpen) return null;

  const closeDialog = () => setIsDialogOpen(false);

  return (
    <Dialog
      title="Cadastro de Transportadora"
      description="Preencha os dados da transportadora aqui."
      isOpen={isDialogOpen}
      onClose={closeDialog}
      header={false}
    >
      <ScrollArea className="h-full">
        <div className="max-w-4xl p-4">
          <div className="p-4 md:p-6 bg-card rounded-lg border">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <div className="space-y-1">
                <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                  <div className="text-2xl font-bold tracking-tight">
                    Ordem de Serviço
                  </div>
                  <Badge
                    variant="outline"
                    className="text-green-500 border-green-600 bg-green-400 bg-opacity-10 w-fit"
                  >
                    MP0001
                  </Badge>
                </div>
                <div className="flex flex-col text-sm text-muted-foreground">
                  <span>
                    Criada por <strong>Bruno Silva</strong>{" "}
                  </span>
                  <span>
                    Liberada por <strong>João Silva</strong>
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="default" className="w-full md:w-auto">
                  <FileIcon className="w-4 h-4 mr-2" />
                  Exportar em PDF
                </Button>
              </div>
            </div>
          </div>

          <div className="py-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border">
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-lg font-semibold text-primary mb-4">
                    Dados da Empresa
                  </h3>
                  <div className="space-y-2">
                    <p className="flex flex-col md:flex-row md:gap-4">
                      <span className="text-muted-foreground">Nome</span>
                      <span className="font-medium">
                        Empresa Vale das Carretas
                      </span>
                    </p>
                    <p className="flex flex-col md:flex-row md:gap-4">
                      <span className="text-muted-foreground">Endereço</span>{" "}
                      <span className="font-medium">Rua das Carretas, 123</span>
                    </p>
                    <p className="flex flex-col md:flex-row md:gap-4">
                      <span className="text-muted-foreground">Email</span>{" "}
                      <span className="font-medium">
                        contato@valedascarretas.com
                      </span>
                    </p>
                    <p className="flex flex-col md:flex-row md:gap-4">
                      <span className="text-muted-foreground">Telefone</span>{" "}
                      <span className="font-medium">(11) 1234-5678</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border">
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-lg font-semibold text-primary mb-4">
                    Dados da Ordem de Serviço
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Frota</p>
                      <p className="font-medium">22510</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Transportadora
                      </p>
                      <p className="font-medium">Transportes ABC Ltda</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Plano</p>
                      <p className="font-medium">Preventiva</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Placa</p>
                      <p className="font-medium">XYZ-9876</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <StatusTimelime />

            <Tabs defaultValue="servicos" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="servicos">Serviços</TabsTrigger>
                <TabsTrigger value="pecas">Peças</TabsTrigger>
                <TabsTrigger value="historico">Histórico</TabsTrigger>
              </TabsList>

              <TabsContent value="servicos" className="mt-4 space-y-4">
                <OrderServices />
              </TabsContent>

              <TabsContent value="pecas" className="mt-4">
                <OrderParts />
              </TabsContent>

              <TabsContent value="historico" className="mt-4">
                <OrderHistory />
              </TabsContent>
            </Tabs>

            <Card className="border">
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold mb-4">
                  Resumo Financeiro
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mão de Obra:</span>
                    <span className="font-medium">R$ 350,00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Peças:</span>
                    <span className="font-medium">R$ 225,00</span>
                  </div>
                  <Separator className="my-4 bg-muted-foreground" />
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span className="text-primary">R$ 575,00</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-4">
              <Button variant="outline" onClick={closeDialog}>
                Cancelar
              </Button>
              <Button className="bg-primary text-white hover:bg-opacity-30 w-full md:w-auto">
                Finalizar Ordem
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </Dialog>
  );
}
