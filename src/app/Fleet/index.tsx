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
import { Badge } from "@/components/ui/badge";
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
import { useFleet } from "./hooks/use-fleet";
import { useSortableTable } from "@/hooks/use-sortable-table";
import { SortableHeader } from "@/components/SortableHeader";
import FleetCreationDialog from "./CreateFleet";
import FleetEditDialog from "./EditFleet";
import { IFleet } from "@/interfaces/fleet.interface";
import { useUpdateFleet } from "./hooks/use-update-fleet";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";

export function Fleet() {
  const [page, setPage] = useState(1);
  const perPage = 20;
  const { data, error, isLoading } = useFleet(page, perPage);
  const { handleEdit, handleDelete, editingFleet, setEditingFleet } =
    useUpdateFleet(() => setEditingFleet(null));
  const { sortedData, sortField, sortOrder, handleSort } =
    useSortableTable<IFleet>(data?.data || [], "fleetNumber");
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<IFleet[]>([]);

  useEffect(() => {
    const filtered = sortedData.filter((fleet) =>
      fleet.fleetNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [sortedData, searchTerm]);

  if (error) {
    return <div>Ocorreu um erro: {error.message}</div>;
  }

  const activeFleets = filteredData
    .filter((fleet) => fleet.isActive)
    .length.toString();

  const toggleRowExpansion = (id: string) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderMobileCard = (fleet: IFleet) => (
    <Card key={fleet.id} className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>Frota {fleet.fleetNumber}</span>
          <Badge
            className="text-xs"
            variant={fleet.isActive ? "secondary" : "outline"}
          >
            {fleet.isActive ? "Ativo" : "Inativo"}
          </Badge>
        </CardTitle>
        <CardDescription>{fleet.plate}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => toggleRowExpansion(fleet.id)}
            className="flex items-center py-2"
          >
            {expandedRows[fleet.id] ? "Menos detalhes" : "Mais detalhes"}
            {expandedRows[fleet.id] ? (
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
              onClick={() => handleEdit(fleet)}
              aria-label="Editar"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500"
              onClick={() => handleDelete(fleet.id)}
              aria-label="Excluir"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {expandedRows[fleet.id] && (
          <div className="mt-2 space-y-2">
            {fleet.trailers ? (
              fleet.trailers.map((trailer, index) => (
                <p key={index}>
                  <strong>{index + 1}º Reboque:</strong> {trailer.plate}
                </p>
              ))
            ) : (
              <p>Nenhum reboque cadastrado.</p>
            )}
            <p>
              <strong>KM:</strong> {fleet.km}
            </p>
            <p>
              <strong>Transportadora:</strong> {fleet.carrierName}
            </p>
            <p>
              <strong>Cadastrado em:</strong>{" "}
              {new Date(fleet.createdAt ?? "").toLocaleDateString()}
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
          <SortableHeader<IFleet>
            field="fleetNumber"
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={handleSort}
          >
            Número Frota
          </SortableHeader>
          <TableHead>Placa</TableHead>
          <TableHead>SR1</TableHead>
          <TableHead>SR2</TableHead>
          <TableHead>SR3</TableHead>
          <SortableHeader<IFleet>
            field="km"
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={handleSort}
          >
            KM
          </SortableHeader>
          <TableHead>Transportadora</TableHead>
          <SortableHeader<IFleet>
            field="createdAt"
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={handleSort}
          >
            Cadastrado em
          </SortableHeader>
          <TableHead>Status</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredData.map((fleet) => (
          <TableRow key={fleet.id}>
            <TableCell>{fleet.fleetNumber}</TableCell>
            <TableCell>{fleet.plate}</TableCell>
            {fleet.trailers ? (
              fleet.trailers.map((trailer, index) => (
                <TableCell>
                  <div key={index}>
                    {index > 0 && <hr />} <strong>{index + 1}</strong>{" "}
                    {trailer.plate}
                  </div>
                </TableCell>
              ))
            ) : (
              <p>Nenhum reboque cadastrado.</p>
            )}
            <TableCell>{fleet.km}</TableCell>
            <TableCell>{fleet.carrierName}</TableCell>
            <TableCell>
              {new Date(fleet.createdAt ?? "").toLocaleDateString()}
            </TableCell>
            <TableCell>
              <Badge
                className="text-xs"
                variant={fleet.isActive ? "secondary" : "outline"}
              >
                {fleet.isActive ? "Ativo" : "Inativo"}
              </Badge>
            </TableCell>
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
                  <DropdownMenuItem onClick={() => handleEdit(fleet)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(fleet.id)}>
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
        <div>Carregando...</div>
      ) : (
        <div className="flex min-h-screen flex-col bg-background mt-14">
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:px-4">
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-2">
              <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 ">
                  <Card className="sm:col-span-2 flex flex-wrap justify-between items-center">
                    <CardHeader>
                      <CardTitle>Frotas</CardTitle>
                      <CardDescription className="max-w-lg text-balance leading-relaxed">
                        Cadastro de Frotas
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-5">
                      <Button variant="secondary">Exportar Relatório</Button>
                      <FleetCreationDialog />
                    </CardContent>
                  </Card>
                  <Card className="pb-4">
                    <CardHeader className="pb-2">
                      <CardDescription>Ativos</CardDescription>
                      <CardTitle className="text-4xl">{activeFleets}</CardTitle>
                    </CardHeader>
                  </Card>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar frota"
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
                        Ativos
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Inativos
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
      {editingFleet && (
        <FleetEditDialog
          fleet={editingFleet}
          onClose={() => setEditingFleet(null)}
        />
      )}
    </ScrollArea>
  );
}
