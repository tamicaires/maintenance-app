import React from "react";
import { TableHead } from "@/components/ui/table";
import { ChevronUp, ChevronDown } from "lucide-react";

interface SortableHeaderProps<T> {
  field: keyof T;
  children: React.ReactNode;
  sortField: keyof T;
  sortOrder: "asc" | "desc";
  onSort: (field: keyof T) => void;
}

export function SortableHeader<T>({
  field,
  children,
  sortField,
  sortOrder,
  onSort,
}: SortableHeaderProps<T>) {
  return (
    <TableHead onClick={() => onSort(field)} className="cursor-pointer">
      <div className="flex items-center">
        {children}
        <span className="ml-2 flex flex-col ">
          <ChevronUp
            className={`h-3 w-3 ${
              sortField === field && sortOrder === "asc"
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          />
          <ChevronDown
            className={`h-3 w-3 ${
              sortField === field && sortOrder === "desc"
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          />
        </span>
      </div>
    </TableHead>
  );
}
