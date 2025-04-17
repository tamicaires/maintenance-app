import { useState } from "react";
import { Search, Filter, ChevronDown, ChevronUp, Plus } from "lucide-react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import { PartRequestCreationDialog } from "@/features/part-request/components/create-part-request";

type Part = {
  id: string;
  name: string;
  quantity: number;
  requester: string;
  totalValue: number;
};

const parts: Part[] = [
  {
    id: "1",
    name: "Válvula do suspensor",
    quantity: 2,
    requester: "João Silva",
    totalValue: 150.0,
  },
  {
    id: "2",
    name: "Amortecedor dianteiro",
    quantity: 4,
    requester: "Maria Oliveira",
    totalValue: 300.0,
  },
  {
    id: "3",
    name: "Cuíca 24H",
    quantity: 1,
    requester: "Carlos Santos",
    totalValue: 500.0,
  },
];

export function OrderParts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [isPartRequestDialogOpen, setIsPartRequestDialogOpen] =
    useState<boolean>(false);
  isPartRequestDialogOpen;
  console.log(setOpenItems);
  const filteredParts = parts.filter(
    (part) =>
      part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.requester.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 bg-card rounded-lg border">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Peças</h1>
        <div className="flex flex-wrap gap-2">
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="text-primary flex items-center gap-1"
              onClick={() => setIsPartRequestDialogOpen(true)}
            >
              <Plus size={15} />
              Solicitar Peça
            </Button>
          </div>
          {/* <PartRequestCreationDialog
            isOpenControlled={true}
            isOpen={isPartRequestDialogOpen}
            onOpenChange={setIsPartRequestDialogOpen}
          /> */}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar peças"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
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
              <TableHead>Nome da Peça</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Solicitante</TableHead>
              <TableHead>Valor Total</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredParts.map((part) => (
              <TableRow key={part.id}>
                <TableCell className="font-medium">{part.name}</TableCell>
                <TableCell>{part.quantity}</TableCell>
                <TableCell>{part.requester}</TableCell>
                <TableCell>R$ {part.totalValue.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm">
                        {openItems[part.id] ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="end"
                      alignOffset={-40}
                      className="w-[300px]"
                    >
                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-semibold mb-2">Detalhes da Peça</h4>
                        <p>
                          Aqui você pode adicionar mais detalhes sobre a peça.
                        </p>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
