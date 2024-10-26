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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { useSortableTable } from "@/hooks/use-sortable-table";
import { SortableHeader } from "@/components/SortableHeader";
import { Spinner } from "@/components/Spinner";
import { IBox } from "@/interfaces/box";
import { useBoxes } from "./hooks/use-box";
import { useUpdateBox } from "./hooks/use-update-box";
import { BoxCreationDialog } from "./CreateBoxForm/create-box-form";

export function BoxManagement() {
  const [page, setPage] = useState(1);
  const perPage = 20;

  const { data, error, isLoading } = useBoxes();

  const { handleEdit, handleDelete, setEditingBox } = useUpdateBox(() =>
    setEditingBox(null)
  );

  const { sortedData, sortField, sortOrder, handleSort } =
    useSortableTable<IBox>(data?.data || [], "name");
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<IBox[]>([]);

  useEffect(() => {
    const filtered = sortedData.filter((box) =>
      box.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [sortedData, searchTerm]);

  if (error) {
    return <div>Ocorreu um erro: {error.message}</div>;
  }

  const activeBoxes = filteredData
    .filter((box) => box.isActive === true)
    .length.toString();

  const toggleRowExpansion = (id: string) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderMobileCard = (box: IBox) => (
    <Card key={box.id} className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>{box.name}</span>
          <Badge
            className="text-xs"
            variant={box.isActive ? "secondary" : "outline"}
          >
            {box.isActive ? "Ativo" : "Inativo"}
          </Badge>
        </CardTitle>
        <CardDescription>{box.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => toggleRowExpansion(box.id)}
            className="flex items-center py-2"
          >
            {expandedRows[box.id] ? "Menos detalhes" : "Mais detalhes"}
            {expandedRows[box.id] ? (
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
              onClick={() => handleEdit(box)}
              aria-label="Editar"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500"
              onClick={() => handleDelete(box.id)}
              aria-label="Excluir"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {expandedRows[box.id] && (
          <div className="mt-2 space-y-2">
            <p>
              <strong>Descrição:</strong> {box.description}
            </p>
            <p>
              <strong>ID da Empresa:</strong> {box.companyId}
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
          <SortableHeader<IBox>
            field="name"
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={handleSort}
          >
            Nome
          </SortableHeader>
          <TableHead>Descrição</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
        {isLoading && (
          <div className="flex justify-center w-full">
            <Spinner />
          </div>
        )}
      <TableBody>
        {filteredData.map((box) => (
          <TableRow key={box.id}>
            <TableCell>{box.name}</TableCell>
            <TableCell>{box.description}</TableCell>
            <TableCell>
              <Badge
                className="text-xs"
                variant={box.isActive ? "secondary" : "outline"}
              >
                {box.isActive ? "Ativo" : "Inativo"}
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
                  <DropdownMenuItem onClick={() => handleEdit(box)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(box.id)}>
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
        <div className="flex min-h-screen flex-col bg-background mt-14">
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:px-4">
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-2">
              <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 ">
                  <Card className="sm:col-span-2 flex flex-wrap justify-between items-center">
                    <CardHeader>
                      <CardTitle>Gestão de Boxes</CardTitle>
                      <CardDescription className="max-w-lg text-balance leading-relaxed">
                        Gerencie e acompanhe os boxes cadastrados na sua
                        empresa.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-5">
                      <Button variant="secondary">Exportar Relatório</Button>
                      <BoxCreationDialog />
                    </CardContent>
                  </Card>
                  <Card className="pb-4">
                    <CardHeader className="pb-2">
                      <CardDescription>Ativos</CardDescription>
                      <CardTitle className="text-4xl">{activeBoxes}</CardTitle>
                    </CardHeader>
                  </Card>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar box"
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
    </ScrollArea>
  );
}
