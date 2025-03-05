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
import { useEmployee } from "./hooks/use-employee";
import { IEmployee } from "@/shared/types/employee.interface";
import { useUpdateEmployee } from "./hooks/use-update-employee";
import EmployeeCreationDialog from "./CreateEmployee";
import { Spinner } from "@/components/Spinner";
// import EmployeeEditDialog from "./EditEmployee";

export function Employee() {
  const [page, setPage] = useState(1);
  const perPage = 20;

  const { data, error, isLoading } = useEmployee(page, perPage);

  const { handleEdit, handleDelete, editingEmployee, setEditingEmployee } =
    useUpdateEmployee(() => setEditingEmployee(null));
    editingEmployee
  const { sortedData, sortField, sortOrder, handleSort } =
    useSortableTable<IEmployee>(data?.data || [], "name");
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<IEmployee[]>([]);

  useEffect(() => {
    const filtered = sortedData.filter((employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [sortedData, searchTerm]);

  if (error) {
    return <div>Ocorreu um erro: {error.message}</div>;
  }

  const activeFleets = filteredData
    .filter((employee) => employee.isActive === true)
    .length.toString();

  const toggleRowExpansion = (id: string) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderMobileCard = (employee: IEmployee) => (
    <Card key={employee.id} className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>{employee.name}</span>
          <Badge
            className="text-xs"
            variant={employee.isActive ? "secondary" : "outline"}
          >
            {employee.isActive ? "Ativo" : "Inativo"}
          </Badge>
        </CardTitle>
        <CardDescription>{employee.jobTitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => toggleRowExpansion(employee.id)}
            className="flex items-center py-2"
          >
            {expandedRows[employee.id] ? "Menos detalhes" : "Mais detalhes"}
            {expandedRows[employee.id] ? (
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
              onClick={() => handleEdit(employee)}
              aria-label="Editar"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500"
              onClick={() => handleDelete(employee.id)}
              aria-label="Excluir"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {expandedRows[employee.id] && (
          <div className="mt-2 space-y-2">
            <p>
              <strong>Turno</strong> {employee.workShift}
            </p>

            <p>
              <strong>Cadastrado em:</strong>{" "}
              {new Date(employee.createdAt ?? "").toLocaleDateString()}
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
          <SortableHeader<IEmployee>
            field="name"
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={handleSort}
          >
            Colaborador
          </SortableHeader>
          <TableHead>Cargo</TableHead>
          <TableHead>Turno</TableHead>
          <TableHead>Cadastrado em</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredData.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell>{employee.name}</TableCell>
            <TableCell>{employee.jobTitle}</TableCell>
            <TableCell>{employee.workShift}</TableCell>
            <TableCell>
              {new Date(employee.createdAt ?? "").toLocaleDateString()}
            </TableCell>
            <TableCell>
              <Badge
                className="text-xs"
                variant={employee.isActive ? "secondary" : "outline"}
              >
                {employee.isActive ? "Ativo" : "Inativo"}
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
                  <DropdownMenuItem onClick={() => handleEdit(employee)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(employee.id)}>
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
        <div className="flex min-h-screen flex-col bg-background mt-14">
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:px-4">
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-2">
              <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 ">
                  <Card className="sm:col-span-2 flex flex-wrap justify-between items-center">
                    <CardHeader>
                      <CardTitle>Colaboradores</CardTitle>
                      <CardDescription className="max-w-lg text-balance leading-relaxed">
                        Cadastro de Colaboradores
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-5">
                      <Button variant="secondary">Exportar Relatório</Button>
                      <EmployeeCreationDialog />
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
                      placeholder="Buscar colaborador"
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
      {/* {editingEmployee && (
        <EmployeeEditDialog
          employee={editingEmployee}
          onClose={() => setEditingEmployee(null)}
        />
      )} */}
    </ScrollArea>
  );
}
