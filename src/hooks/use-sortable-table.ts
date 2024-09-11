import { useState, useMemo } from "react";

type SortOrder = "asc" | "desc";

export function useSortableTable<T>(
  data: T[],
  defaultSortField: keyof T,
  defaultSortOrder: SortOrder = "asc"
) {
  const [sortField, setSortField] = useState<keyof T>(defaultSortField);
  const [sortOrder, setSortOrder] = useState<SortOrder>(defaultSortOrder);

  const sortedData = useMemo(() => {
    const sortedArray = [...data];
    sortedArray.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }

      // Para datas
      if (aValue instanceof Date && bValue instanceof Date) {
        return sortOrder === "asc"
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime();
      }

      // Para campos que podem ser string ou number (como 'km')
      const aNum = Number(aValue);
      const bNum = Number(bValue);
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return sortOrder === "asc" ? aNum - bNum : bNum - aNum;
      }

      return 0;
    });
    return sortedArray;
  }, [data, sortField, sortOrder]);

  const handleSort = (field: keyof T) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return { sortedData, sortField, sortOrder, handleSort };
}
