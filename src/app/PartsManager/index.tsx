import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Package,
  Users,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParts } from "./hooks/use-parts";
import { InventoryTable } from "@/components/InventoryTable";
import { RequestTable } from "@/components/RequestTable";
import { usePartRequests } from "@/app/part-request/hooks/use-part-requests";
import { OpenRequestsList } from "@/components/OpenRequestsList";
import { RequestStatus } from "@/shared/enums/part-request";
import { Button } from "@/components/ui/button";
import { IPartRequest } from "@/shared/types/part-request";

export enum PartLocation {
  ESTOQUE = "ESTOQUE",
  APLICADO = "APLICADO",
  RECUPERACAO = "RECUPERACAO",
}

export enum PartStatus {
  NOVO = "NOVO",
  RECUPERADO = "RECUPERADO",
}

const chartData = [
  { month: "Jan", quantity: 65 },
  { month: "Fev", quantity: 59 },
  { month: "Mar", quantity: 80 },
  { month: "Abr", quantity: 81 },
  { month: "Mai", quantity: 56 },
  { month: "Jun", quantity: 55 },
];

export function PartsManager() {
  const [search, setSearch] = useState("");
  const [isConsumptionCollapsed, setIsConsumptionCollapsed] = useState(true);
  const { data, error, isLoading } = useParts();
  const { data: partRequestData, isLoading: isPartRequestLoading } =
    usePartRequests();
  const [partRequests, setPartRequests] = useState<IPartRequest[]>([]);

  const parts = data?.data || [];
  const requests = partRequestData?.data || [];
  const filteredParts = parts.filter((part) =>
    part.name.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    if (partRequestData?.data) {
      setPartRequests(partRequestData.data);
    }
  }, [partRequestData]);

  const handleUpdateRequests = (updatedRequests: IPartRequest[]) => {
    setPartRequests(updatedRequests);
  };

  if (isPartRequestLoading) {
    return <div>Loading...</div>;
  }
  const totalParts = parts.length;
  const lowStockParts = parts.filter((part) => part.stockQuantity < 10).length;
  const newParts = parts.filter(
    (part) => part.status === PartStatus.NOVO
  ).length;

  const averageConsumption =
    chartData.reduce((sum, item) => sum + item.quantity, 0) / chartData.length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 text-2xl">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="container flex flex-col lg:flex-row gap-4 mx-auto p-4 pt-16">
      <div className="flex flex-col w-full lg:w-3/4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Peças
              </CardTitle>
              <Package className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalParts}</div>
              <p className="text-xs text-muted-foreground">
                {newParts} peças novas
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Solicitações Abertas
              </CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                -5% em relação à semana passada
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Peças em Baixo Estoque
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lowStockParts}</div>
              <p className="text-xs text-muted-foreground">
                Peças com menos de 10 unidades
              </p>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-1 lg:col-span-2 min-h-[65vh]">
          <CardHeader>
            <CardTitle>Gestão de Peças</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="inventory" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="inventory">Inventário</TabsTrigger>
                <TabsTrigger value="requests">Solicitações</TabsTrigger>
              </TabsList>
              <TabsContent value="inventory">
                <InventoryTable parts={filteredParts} />
              </TabsContent>
              <TabsContent value="requests">
                <RequestTable partRequests={requests} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6 w-full h-full lg:w-1/3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Consumo de Peças</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsConsumptionCollapsed(!isConsumptionCollapsed)}
            >
              {isConsumptionCollapsed ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
            </Button>
          </CardHeader>
          <CardContent>
            {isConsumptionCollapsed ? (
              <div className="text-center">
                <p className="text-lg font-semibold">Média Geral</p>
                <p className="text-3xl font-bold">
                  {averageConsumption.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">peças/mês</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <Tooltip />
                  <Bar dataKey="quantity" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
        <OpenRequestsList
          requests={partRequests.filter(
            (request) => request.status === RequestStatus.PENDING
          )}
          onUpdateRequests={handleUpdateRequests}
        />
      </div>
    </div>
  );
}
