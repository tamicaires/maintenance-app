import { useState, useEffect } from "react";
import {
  Search,
  File,
  ListFilter,
  MoreHorizontal,
  Edit,
  Trash2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSortableTable } from "@/hooks/use-sortable-table";
import { SortableHeader } from "@/components/SortableHeader";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { useService } from "../Services/hooks/use-service";
import { IService } from "@/shared/types/service.interface";
import { useUpdateService } from "../Services/hooks/use-update-service";
import { Spinner } from "@/components/Spinner";
import ServiceCreationDialog from "../Services/CreateService";
import ServiceEditDialog from "../Services/EditService";

export function Service() {
  const [page, setPage] = useState(1);
  const perPage = 20;

  const { data, error, isLoading } = useService();

  const { handleEdit, handleDelete, editingService, setEditingService } =
    useUpdateService(() => setEditingService(null));

  const { sortedData, sortField, sortOrder, handleSort } =
    useSortableTable<IService>(data?.data || [], "serviceName");
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<IService[]>([]);

  useEffect(() => {
    const filtered = sortedData.filter((service) =>
      service.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [sortedData, searchTerm]);

  if (error) {
    return <div>Ocorreu um erro: {error.message}</div>;
  }

  const toggleRowExpansion = (id: string) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderMobileCard = (service: IService) => (
    <Card key={service.id} className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>{service.serviceName}</span>
        </CardTitle>
        <CardDescription>{service.serviceCategory}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => toggleRowExpansion(service.id)}
            className="flex items-center py-2"
          >
            {expandedRows[service.id] ? "Menos detalhes" : "Mais detalhes"}
            {expandedRows[service.id] ? (
              <ChevronUp className="h-4 w-4 ml-2" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-2" />
            )}
          </Button>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-primary"
              onClick={() => handleEdit(service)}
              aria-label="Editar"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500"
              onClick={() => handleDelete(service.id)}
              aria-label="Excluir"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {expandedRows[service.id] && (
          <div className="mt-2 space-y-2">
            <p>
              <strong>Categoria:</strong> {service.serviceCategory}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderDesktopTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <SortableHeader<IService>
            field="serviceName"
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={handleSort}
          >
            Nome do Serviço
          </SortableHeader>
          <TableHead>Categoria</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredData.map((service) => (
          <TableRow key={service.id}>
            <TableCell>{service.serviceName}</TableCell>
            <TableCell>{service.serviceCategory}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => handleEdit(service)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(service.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const handlePreviousPage = () => {
    setPage((p) => Math.max(1, p - 1));
  };

  const handleNextPage = () => {
    if (filteredData.length === perPage) {
      setPage((p) => p + 1);
    }
  };

  return (
    <ScrollArea>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex min-h-screen flex-col bg-background mt-16">
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:px-4">
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-2">
              <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                <div className="gap-4">
                  <Card className="sm:col-span-2 flex flex-wrap justify-between items-center">
                    <CardHeader>
                      <CardTitle>Serviços</CardTitle>
                      <CardDescription className="max-w-lg text-balance leading-relaxed">
                        Cadastro de Serviços
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-5">
                      <Button variant="secondary" className="w-full sm:w-auto">
                        Exportar Relatório
                      </Button>
                      <ServiceCreationDialog />
                    </CardContent>
                  </Card>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar serviço"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 h-9"
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10"
                      >
                        <ListFilter className="h-4 w-4" />
                        <span className="sr-only">Filtrar</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filtrar</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        Todos
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button size="icon" variant="outline" className="h-10 w-10">
                    <File className="h-4 w-4" />
                    <span className="sr-only">Exportar</span>
                  </Button>
                </div>
                <Card className="pt-4">
                  <CardContent>
                    <div className="hidden md:block">
                      {renderDesktopTable()}
                    </div>
                    <div className="md:hidden">
                      {filteredData.map(renderMobileCard)}
                    </div>
                    <Pagination className="mt-4">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handlePreviousPage();
                            }}
                          />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#" isActive>
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleNextPage();
                            }}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </CardContent>
                </Card>
              </div>
            </main>
          </div>
        </div>
      )}
      {editingService && (
        <ServiceEditDialog
          service={editingService}
          onClose={() => setEditingService(null)}
        />
      )}
    </ScrollArea>
  );
}
