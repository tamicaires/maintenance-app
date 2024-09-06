import React, { useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IService } from "@/interfaces/service.interface";

type Service = {
  id: string;
  serviceName: string;
  category: string;
  rebCount: number;
  noOfItems: number;
  totalAmount: number;
  dueDate: string;
  employees?: { name: string; jobTitle: string }[];
};

interface ServiceProps {
  services: IService[];
}
const services: Service[] = [
  {
    id: "1",
    serviceName: "Retirar vazamento de ar da válvula do suspensor",
    category: "ELÉTRICA",
    rebCount: 3,
    noOfItems: 1,
    totalAmount: 150.0,
    dueDate: "28 Feb 2024",
    employees: [
      { name: "Bruno Silva", jobTitle: "Mecânico" },
      { name: "João Silva", jobTitle: "Mecânico" },
    ],
  },
  {
    id: "2",
    serviceName: "Verificação de Suspensão",
    category: "SUSPENSÃO",
    rebCount: 2,
    noOfItems: 2,
    totalAmount: 300.0,
    dueDate: "01 Mar 2024",
    employees: [
      { name: "Ana Souza", jobTitle: "Mecânico" },
      { name: "Maria Oliveira", jobTitle: "Auxiliar" },
    ],
  },
  {
    id: "3",
    serviceName: "Trocar Cuíca 24H LD",
    category: "SISTEMA DE FREIO",
    rebCount: 3,
    noOfItems: 1,
    totalAmount: 500.0,
    dueDate: "15 Mar 2024",
  },
];

export function OrderServices({ services }: ServiceProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const filteredServices = services.filter(
    (service) =>
      service.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === "All" || service.serviceCategory === categoryFilter)
  );

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
    setCategoryFilter("All");
  };

  return (
    <div>
      <div className="container mx-auto p-4 bg-card rounded-lg border">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold mb-4 sm:mb-0">Serviços</h1>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="ghost"
              className="text-primary flex items-center gap-1"
            >
              <Plus size={15} />
              Adicionar Serviço
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar serviços"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            {/* <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Todas Categorias</SelectItem>
                <SelectItem value="ELÉTRICA">ELÉTRICA</SelectItem>
                <SelectItem value="SUSPENSÃO">SUSPENSÃO</SelectItem>
                <SelectItem value="SISTEMA DE FREIO">
                  SISTEMA DE FREIO
                </SelectItem>
              </SelectContent>
            </Select> */}
            <Button variant="outline" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Nome do Serviço</TableHead>
                <TableHead className="hidden md:table-cell">
                  Categoria
                </TableHead>
                <TableHead className="hidden md:table-cell">Reboques</TableHead>

                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.map((service) => (
                <React.Fragment key={service.id}>
                  <TableRow>
                    <TableCell className="font-medium">
                      {service.serviceName}
                      <div className="md:hidden text-sm text-gray-500">
                        {service.serviceCategory}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {service.serviceCategory}
                    </TableCell>
                    <TableCell className="hidden md:flex md:gap-2">
                      {/* {[...Array(service.rebCount)].map((_, index) => (
                        <Tag color="blue" children={`${index + 1}º Reb`} />
                      ))} */}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center space-x-2 ">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm">
                              {openItems[service.id] ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent align="end" alignOffset={-10}>
                            <TableRow>
                              <TableCell colSpan={5}>
                                <div className="p-2 bg-muted/20 rounded-lg">
                                  <div className="flex flex-wrap gap-4 mb-4 justify-between">
                                    <div>
                                      <h4 className="font-semibold mb-2">
                                        Detalhes do Serviço
                                      </h4>
                                      <div className="space-y-2">
                                        <div className="flex items-center text-muted-foreground">
                                          <Calendar className="h-4 w-4 mr-2" />
                                          <span>Início: 12/02/2024 12:40</span>
                                        </div>
                                        <div className="flex items-center text-muted-foreground">
                                          <Clock className="h-4 w-4 mr-2" />
                                          <span>Prazo: 16:34</span>
                                        </div>
                                        <div className="flex gap-3">
                                          <span className="font-semibold">
                                            Status:
                                          </span>
                                          <Badge
                                            variant={"secondary"}
                                            className="text-orange-500 bg-orange-300 bg-opacity-15 border border-orange-500"
                                          >
                                            Pendente
                                          </Badge>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-2">
                                        Responsáveis
                                      </h4>
                                      <div className="space-y-2">
                                        {service.employees &&
                                          service.employees.map(
                                            (person, index) => (
                                              <div
                                                key={index}
                                                className="flex items-center space-x-2"
                                              >
                                                <Avatar>
                                                  <AvatarFallback>
                                                    {/* <UserCircle2 /> */}
                                                  </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                  <div className="font-medium">
                                                    {person.name}
                                                  </div>
                                                  <div className="text-sm text-muted-foreground">
                                                    {person.jobTitle}
                                                  </div>
                                                </div>
                                              </div>
                                            )
                                          )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-wrap justify-end space-x-2 mt-4">
                                    <Button size="sm" variant="default">
                                      <CheckCircle2 className="h-4 w-4 mr-2" />
                                      Marcar como Concluído
                                    </Button>
                                    <Button size="sm" variant="destructive">
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Cancelar Serviço
                                    </Button>
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          </PopoverContent>
                          {/* <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button> */}
                        </Popover>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow className="md:hidden">
                    <TableCell colSpan={7} className="p-0">
                      <Collapsible
                        open={openItems[service.id]}
                        onOpenChange={() => toggleItem(service.id)}
                      >
                        <CollapsibleContent className="p-4 bg-gray-100">
                          {/* <div className="grid grid-cols-2 gap-2">
                            <div>Reboques:</div>
                            <div>
                              {[...Array(service.rebCount)].map((_, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="mr-1"
                                >
                                  {index + 1}º Reb
                                </Badge>
                              ))}
                            </div>
                            <div>No. de Itens:</div>
                            <div>{service.noOfItems}</div>
                            <div>Valor Total:</div>
                            <div>R$ {service.totalAmount.toFixed(2)}</div>
                            <div>Data de Vencimento:</div>
                            <div>{service.dueDate}</div>
                          </div> */}
                        </CollapsibleContent>
                      </Collapsible>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
