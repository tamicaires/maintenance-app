import { useState } from "react";
import { Search, MoreVertical } from "lucide-react";
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
import { PartCreationDialog } from "@/features/part-manager/components/create-part-dialog";
import { IPart } from "@/shared/types/part";
import { PartLocation, PartStatus } from "@/shared/enums/part";

interface InventoryTableProps {
  parts: IPart[];
}

export function InventoryTable({ parts }: InventoryTableProps) {
  const [search, setSearch] = useState("");
  const filteredParts = parts.filter((part: IPart) =>
    part.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-between items-center mb-4 gap-10">
        <div className="flex gap-3 items-center w-4/5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Pesquisar peças..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1"
          />
        </div>
        <PartCreationDialog />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Número da Peça</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Preço de Custo</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Localização</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredParts.map((part: IPart) => (
            <TableRow key={part.id}>
              <TableCell>{part.name}</TableCell>
              <TableCell>{part.partNumber}</TableCell>
              <TableCell>{part.stockQuantity}</TableCell>
              <TableCell>R$ {part.costPrice.toFixed(2)}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    part.status === PartStatus.NOVO
                      ? "bg-primary/20 text-primary"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {part.status}
                </span>
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    part.location === PartLocation.ESTOQUE
                      ? "bg-green-100 text-green-800"
                      : part.location === PartLocation.APLICADO
                      ? "bg-blue-100 text-blue-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {part.location}
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
    </>
  );
}
