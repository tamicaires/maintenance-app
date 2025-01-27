import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Activity, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

export interface ITableFilterOption {
  name: string;
  options?: { label: string; value: string }[];
  render?: React.ReactNode;
}
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchColumn?: string;
  filterOptions?: ITableFilterOption[];
}

export function DataTableToolbar<TData>({
  table,
  searchColumn,
  filterOptions,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const column = table.getColumn(searchColumn ?? "");
    const searchValue = event.target.value;

    if (column) {
      column.setFilterValue(searchValue);
    }
  };

  const renderFilterOption = (filter: ITableFilterOption) => {
    if (filter.options) {
      return (
        <Select key={filter.name}>
          <SelectTrigger className="h-9 w-[120px]">
            <Activity className="mr-2 h-4 w-4 text-muted-foreground" />
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
      );
    }

    return null;
  };

  const renderFilterComponent = (filter: ITableFilterOption) => {
    if (filter.render) {
      return <React.Fragment key={filter.name}>{filter.render}</React.Fragment>;
    }

    return null;
  };

  return (
    <div className="flex flex-1 items-center space-x-2">
      {/* Search Input */}
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative">
          <Input
            placeholder="Buscar"
            value={
              (table
                .getColumn(searchColumn || "")
                ?.getFilterValue() as string) ?? ""
            }
            onChange={handleSearch}
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

      {/* Filter Options */}
      <div className="flex items-center space-x-2">
        {filterOptions &&
          filterOptions.map((filter) => {
            return filter.options
              ? renderFilterOption(filter)
              : renderFilterComponent(filter);
          })}
      </div>
    </div>
  );
}
