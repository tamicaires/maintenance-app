import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Search,
  MoreVertical,
  Plus,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const chartData = [
  { month: "Jan", quantity: 65 },
  { month: "Fev", quantity: 59 },
  { month: "Mar", quantity: 80 },
  { month: "Abr", quantity: 81 },
  { month: "Mai", quantity: 56 },
  { month: "Jun", quantity: 55 },
];

interface Part {
  id: string;
  name: string;
  quantity: number;
  lastUpdate: string;
  status: "Em estoque" | "Baixo estoque" | "Sem estoque";
}

const parts: Part[] = [
  {
    id: "1",
    name: "Parafuso 10mm",
    quantity: 500,
    lastUpdate: "2023-06-01",
    status: "Em estoque",
  },
  {
    id: "2",
    name: "Porca 8mm",
    quantity: 300,
    lastUpdate: "2023-06-02",
    status: "Em estoque",
  },
  {
    id: "3",
    name: "Arruela 12mm",
    quantity: 50,
    lastUpdate: "2023-06-03",
    status: "Baixo estoque",
  },
  {
    id: "4",
    name: "Engrenagem 5cm",
    quantity: 0,
    lastUpdate: "2023-06-04",
    status: "Sem estoque",
  },
  {
    id: "5",
    name: "Mola 15cm",
    quantity: 100,
    lastUpdate: "2023-06-05",
    status: "Em estoque",
  },
];

const requests = [
  {
    id: "1",
    user: "João Silva",
    part: "Parafuso 10mm",
    quantity: 50,
    status: "Pendente",
  },
  {
    id: "2",
    user: "Maria Santos",
    part: "Porca 8mm",
    quantity: 100,
    status: "Aprovada",
  },
  {
    id: "3",
    user: "Carlos Oliveira",
    part: "Arruela 12mm",
    quantity: 25,
    status: "Pendente",
  },
];

const openRequests = [
  {
    id: "1",
    user: "Ana Rodrigues",
    part: "Parafuso 10mm",
    quantity: 100,
    time: "2h atrás",
    serviceOrder: "OS-001",
  },
  {
    id: "2",
    user: "Pedro Alves",
    part: "Engrenagem 5cm",
    quantity: 5,
    time: "4h atrás",
    serviceOrder: "OS-002",
  },
  {
    id: "3",
    user: "Mariana Costa",
    part: "Mola 15cm",
    quantity: 20,
    time: "6h atrás",
    serviceOrder: "OS-003",
  },
];

export function PartsManager() {
  const [search, setSearch] = useState("");

  const filteredParts = parts.filter((part) =>
    part.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container flex gap-4 mx-auto p-4 pt-16">
      <div className="flex flex-col w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Peças
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-primary"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">950</div>
              <p className="text-xs text-muted-foreground">
                +20.1% em relação ao mês anterior
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Solicitações Abertas
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-primary"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-primary"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">
                +2 desde o último relatório
              </p>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-1 lg:col-span-2">
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
                <div className="flex items-center space-x-2 mb-4">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Pesquisar peças..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1"
                  />
                  <Button>
                    <Plus className="h-4 w-4 mr-2" /> Adicionar Peça
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Quantidade</TableHead>
                      <TableHead>Última Atualização</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredParts.map((part) => (
                      <TableRow key={part.id}>
                        <TableCell>{part.name}</TableCell>
                        <TableCell>{part.quantity}</TableCell>
                        <TableCell>{part.lastUpdate}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              part.status === "Em estoque"
                                ? "bg-primary/20 text-primary"
                                : part.status === "Baixo estoque"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-destructive/20 text-destructive"
                            }`}
                          >
                            {part.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="requests">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuário</TableHead>
                      <TableHead>Peça</TableHead>
                      <TableHead>Quantidade</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>{request.user}</TableCell>
                        <TableCell>{request.part}</TableCell>
                        <TableCell>{request.quantity}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              request.status === "Aprovada"
                                ? "bg-primary/20 text-primary"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {request.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Section 2 */}
      <div className="space-y-6 w-2/4">
        <Card>
          <CardHeader>
            <CardTitle>Consumo de Peças</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                {/* <YAxis /> */}
                <Tooltip />
                <Bar dataKey="quantity" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Solicitações em Aberto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {openRequests.map((request, index) => (
                <div key={request.id}>
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{request.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {request.user}{" "}
                        <span className="text-muted-foreground font-normal">
                          solicitou
                        </span>{" "}
                        {request.quantity}x {request.part}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{request.time}</span>
                        <span className="mx-2">•</span>
                        <span>OS: {request.serviceOrder}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Ver
                    </Button>
                  </div>
                  {index < openRequests.length - 1 && (
                    <Separator className="my-4" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
