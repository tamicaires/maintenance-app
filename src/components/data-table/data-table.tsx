import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { DataTablePagination } from "./data-table-pagination"
import { DataTableToolbar, type ITableFilterOption } from "./data-table-toolbar"
import { DataTableTabs } from "./data-table-tabs"
import EmptyState from "../states/empty-state"
import { Spinner } from "../Spinner"

interface DataTableWithFiltersProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  searchColumn?: string
  data: TData[]
  tabs?: {
    value: string
    label: string
    count: number
  }[]
  filterOptions?: ITableFilterOption[]
  isloadingData?: boolean
  totalItems: number
  onPaginationChange: (pageIndex: number, pageSize: number) => void
}

export function ReportTable<TData, TValue>({
  columns,
  searchColumn,
  data,
  tabs,
  filterOptions,
  isloadingData,
  totalItems,
  onPaginationChange,
}: DataTableWithFiltersProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [{ pageIndex, pageSize }, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5,
  })

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  )

  const memoizedOnPaginationChange = React.useCallback(
    (pageIdx: number, pageSz: number) => {
      onPaginationChange(pageIdx, pageSz)
    },
    [onPaginationChange],
  )

  React.useEffect(() => {
    memoizedOnPaginationChange(pageIndex, pageSize)
  }, [pageIndex, pageSize, memoizedOnPaginationChange])

  const tableOptions = React.useMemo(
    () => ({
      data,
      columns,
      pageCount: Math.ceil(totalItems / pageSize),
      state: {
        sorting,
        columnVisibility,
        rowSelection,
        columnFilters,
        pagination,
      },
      enableRowSelection: true,
      onRowSelectionChange: setRowSelection,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      onColumnVisibilityChange: setColumnVisibility,
      onPaginationChange: setPagination,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      manualPagination: true,
    }),
    [data, columns, totalItems, pageSize, sorting, columnVisibility, rowSelection, columnFilters, pagination],
  )

  const table = useReactTable(tableOptions)

  const showHeader = React.useMemo(() => tabs || filterOptions, [tabs, filterOptions])
  const canPreviousPage = pageIndex > 0
  const canNextPage = (pageIndex + 1) * pageSize < totalItems

  return (
    <div className="space-y-4 w-full">
      {showHeader && (
        <div className="bg-accent/50 p-4 rounded-t-lg">
          {tabs && <DataTableTabs tabs={tabs} />}
          {filterOptions && (
            <DataTableToolbar table={table} filterOptions={filterOptions} searchColumn={searchColumn} />
          )}
        </div>
      )}
      <div className="bg-card rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-0">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="px-4 text-muted-foreground font-medium">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b border-muted hover:bg-muted/30"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {isloadingData ? (
                    <Spinner />
                  ) : (
                    <EmptyState
                      message="Ops, parece que está vazio por aqui!"
                      description="Não há dados disponíveis para exibição."
                    />
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} canPreviousPage={canPreviousPage} canNextPage={canNextPage} />
    </div>
  )
}

