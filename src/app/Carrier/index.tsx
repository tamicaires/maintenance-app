import { File, ListFilter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCarrier } from "./hooks/use-carrier";
import { useState } from "react";
import { CreateCarrier } from "./CreateCarrier";

export function Carrier() {
  const { data, isLoading, error } = useCarrier();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Ocorreu um erro: {error.message}</div>;
  }

  const handleOpenModal = () => {
    setIsDialogOpen(true);
  };
  return (
    <ScrollArea>
      <div className="flex min-h-screen flex-col bg-background mt-14">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:px-4">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-2">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 ">
                <Card
                  className="sm:col-span-2 flex flex-wrap justify-between"
                  x-chunk="dashboard-05-chunk-0"
                >
                  <CardHeader className="pb-3">
                    <CardTitle>Transportadoras</CardTitle>
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      Cadastro de Transportadoras
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex gap-5">
                    <Button variant="secondary">Exportar Relatório</Button>
                    <Button onClick={handleOpenModal}>Cadastrar Novo</Button>
                  </CardFooter>
                </Card>
                <Card className="pb-4" x-chunk="dashboard-05-chunk-1">
                  <CardHeader className="pb-2">
                    <CardDescription>Ativos</CardDescription>
                    <CardTitle className="text-4xl">34</CardTitle>
                  </CardHeader>
                </Card>
              </div>
              <Tabs defaultValue="week">
                <div className="flex items-center">
                  <TabsList>
                    <TabsTrigger value="week">Semana</TabsTrigger>
                    <TabsTrigger value="month">Mês</TabsTrigger>
                    <TabsTrigger value="year">Ano</TabsTrigger>
                  </TabsList>
                  <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 gap-1 text-sm"
                        >
                          <ListFilter className="h-3.5 w-3.5" />
                          <span className="sr-only sm:not-sr-only">
                            Filtrar
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem checked>
                          Ativos
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Inativos
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 gap-1 text-sm"
                    >
                      <File className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                <TabsContent value="week">
                  <Card className="pt-4" x-chunk="dashboard-05-chunk-3">
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Transportadora</TableHead>
                            <TableHead className="hidden sm:table-cell">
                              Nome Proprietário
                            </TableHead>
                            <TableHead className="hidden sm:table-cell">
                              Contato Proprietário
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                              Criado em
                            </TableHead>
                            <TableHead className="text-right">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {data?.data?.map((carrier) => (
                            <TableRow key={carrier.id}>
                              <TableCell>
                                <div className="font-medium">
                                  {carrier.carrierName}
                                </div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                {carrier.managerName}
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                {carrier.managerPhone}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {new Date(
                                  carrier.createdAt ?? ""
                                ).toLocaleDateString()}
                              </TableCell>
                              <TableCell className="text-right">
                                <Badge
                                  className="text-xs"
                                  variant={
                                    carrier.status === "ATIVO"
                                      ? "secondary"
                                      : "outline"
                                  }
                                >
                                  {carrier.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
        <CreateCarrier
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      </div>
    </ScrollArea>
  );
}
