import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Calendar, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterOptions?: {
    name: string;
    options: { label: string; value: string }[];
  }[];
}

export function DataTableToolbar<TData>({
  table,
  filterOptions,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-1 items-center space-x-2">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative">
          <Input
            placeholder="Buscar"
            value={
              (table.getColumn("carrierName")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("carrierName")?.setFilterValue(event.target.value)
            }
            className="h-9 w-[150px] lg:w-[250px] pl-8"
          />
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Resetar
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" className="h-9">
          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
          Filtrar Data
        </Button>
        {filterOptions?.map((filter) => (
          <Select key={filter.name}>
            <SelectTrigger className="h-9 w-[120px]">
              <SelectValue placeholder={filter.name} />
            </SelectTrigger>
            <SelectContent>
              {filter.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
        <Button variant="outline" size="sm" className="h-9">
          <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
          Filtros
        </Button>
      </div>
    </div>
  );
}
