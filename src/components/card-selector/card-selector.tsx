"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GridViewItem } from "./grid-view-item"
import EmptyState from "../empty-state"
import { ListViewItem } from "./list-view-item"
import { Search } from "lucide-react"

export interface CardSelectionOption {
  id: string
  title: string
  description: string
  icon?: string
}

interface CardSelectorProps {
  title: string
  description: string
  options: CardSelectionOption[]
  value: string
  onChange: (value: string) => void
  trigger?: React.ReactNode
  onSubmit?: () => void
  variant?: "grid" | "list"
  showPagination?: boolean
  showFooter?: boolean
  confirmText?: string
}

export function CardSelector({
  title,
  description,
  options,
  value,
  onChange,
  onSubmit,
  variant = "grid",
  showPagination = true,
  showFooter = true,
  confirmText = "Confirmar",
}: CardSelectorProps) {
  const [page, setPage] = React.useState(0)
  const [searchQuery, setSearchQuery] = React.useState("")

  // Define items per page based on variant
  const itemsPerPage = variant === "grid" ? 6 : 3

  // Filter options based on search query
  const filteredOptions = options.filter(
    (option) =>
      option.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      option.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredOptions.length / itemsPerPage)

  // Reset to first page when search query changes
  React.useEffect(() => {
    setPage(0)
  }, [searchQuery])

  // Reset to first page when variant changes
  React.useEffect(() => {
    setPage(0)
  }, [variant])

  const handleSubmit = () => {
    onSubmit?.()
  }

  const paginatedOptions = filteredOptions.slice(page * itemsPerPage, (page + 1) * itemsPerPage)

  const hasPaginatedOptions = paginatedOptions.length > 0

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1)
    }
  }

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1)
    }
  }

  const renderGridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
      {hasPaginatedOptions ? (
        paginatedOptions.map((option) => (
          <GridViewItem key={option.id} option={option} value={value} onChange={onChange} />
        ))
      ) : (
        <div className="col-span-full">
          <EmptyState
            message="Ops, parece que aqui está vazio!"
            description="Isso acontece quando não possui nenhum item para mostrar"
          />
        </div>
      )}
    </div>
  )

  const renderListView = () => (
    <div className="space-y-2 mb-4">
      {hasPaginatedOptions ? (
        paginatedOptions.map((option) => (
          <ListViewItem key={option.id} option={option} value={value} onChange={onChange} />
        ))
      ) : (
        <div>
          <EmptyState
            message="Ops, parece que aqui está vazio!"
            description="Isso acontece quando não possui nenhum item para mostrar"
          />
        </div>
      )}
    </div>
  )

  const renderPagination = () => {
    if (!showPagination || totalPages <= 1) return null

    if (variant === "grid") {
      return (
        <div className="flex items-center justify-center gap-1 mt-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${page === index ? "bg-primary" : "bg-gray-200"}`}
              onClick={() => setPage(index)}
            />
          ))}
        </div>
      )
    } else {
      return (
        <div className="flex items-center justify-between mt-4">
          <Button variant="outline" size="sm" onClick={handlePrevPage} disabled={page === 0}>
            Anterior
          </Button>
          <span className="text-sm text-muted-foreground">
            {page + 1} / {totalPages}
          </span>
          <Button variant="outline" size="sm" onClick={handleNextPage} disabled={page >= totalPages - 1}>
            Próximo
          </Button>
        </div>
      )
    }
  }

  const content = (
    <>
      <div className="relative my-4">
        <Input
          placeholder="Buscar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>

      <div className="py-4">
        {variant === "grid" ? renderGridView() : renderListView()}
        {renderPagination()}
      </div>

      {showFooter && (
        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={handleSubmit}>{confirmText}</Button>
        </div>
      )}
    </>
  )

  return (
    <div>
      <h2 className="text-2xl font-semibold leading-none tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground pt-1">{description}</p>
      <div>{content}</div>
    </div>
  )
}

