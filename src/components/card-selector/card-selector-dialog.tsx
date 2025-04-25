import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GridViewItem } from "./grid-view-item";
import EmptyState from "../states/empty-state";
import { ListViewItem } from "./list-view-item";

export interface CardSelectionOption {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

interface CardSelectorDialogProps {
  title: string;
  description: string;
  options: CardSelectionOption[];
  value: string;
  onChange: (value: string) => void;
  trigger?: React.ReactNode;
  onSubmit?: () => void;
  variant?: "grid" | "list";
  showPagination?: boolean;
  showFooter?: boolean;
  confirmText?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  dialogMode?: boolean;
}

export function CardSelectorDialog({
  title,
  description,
  options,
  value,
  onChange,
  trigger,
  onSubmit,
  variant = "grid",
  showPagination = true,
  showFooter = true,
  confirmText = "Confirmar",
  open: controlledOpen,
  onOpenChange,
  dialogMode = true,
}: CardSelectorDialogProps) {
  const [page, setPage] = React.useState(0);
  const itemsPerPage = variant === "grid" ? 6 : 3;
  const totalPages = Math.ceil(options.length / itemsPerPage);

  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = controlledOpen !== undefined;
  const openState = isControlled ? controlledOpen : internalOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  const handleSubmit = () => {
    onSubmit?.();
    if (dialogMode) {
      handleOpenChange(false);
    }
  };

  const paginatedOptions = options.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );
  const hasPaginatedOptions = paginatedOptions.length > 0;

  const renderGridView = () => (
    <div className="grid grid-cols-3 gap-4 mb-4">
      {hasPaginatedOptions ? (
        paginatedOptions.map((option) => (
          <GridViewItem option={option} value={value} onChange={onChange} />
        ))
      ) : (
        <div className="col-span-3">
          <EmptyState
            message="Ops, parece que aqui está vazio!"
            description="Isso acontece quando não possui nenhum item para mostrar"
          />
        </div>
      )}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-2 mb-4">
      {hasPaginatedOptions ? (
        paginatedOptions.map((option) => (
          <ListViewItem option={option} value={value} onChange={onChange} />
        ))
      ) : (
        <div className="">
          <EmptyState
            message="Ops, parece que aqui está vazio!"
            description="Isso acontece quando não possui nenhum item para mostrar"
          />
        </div>
      )}
    </div>
  );

  const content = (
    <>
      {/* <div className="flex flex-row items-start justify-end mb-4">
        {showPagination && totalPages > 1 && variant === "list" && (
          <span className="text-sm text-muted-foreground">
            {page + 1}/{totalPages}
          </span>
        )}
      </div> */}

      <div className="py-4">
        {variant === "grid" ? renderGridView() : renderListView()}

        {showPagination && totalPages > 1 && variant === "grid" && (
          <div className="flex items-center justify-center gap-1 mt-4">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  page === index ? "bg-primary" : "bg-gray-200"
                }`}
                onClick={() => setPage(index)}
              />
            ))}
          </div>
        )}
      </div>

      {showFooter && (
        <div className="flex justify-end gap-2 mt-4">
          {dialogMode && (
            <Button variant="outline" onClick={() => handleOpenChange(false)}>
              Cancelar
            </Button>
          )}
          <Button onClick={handleSubmit}>{confirmText}</Button>
        </div>
      )}
    </>
  );

  if (!dialogMode) {
    return (
      <div>
        <h2 className="text-2xl font-semibold leading-none tracking-tight">
          {title}
        </h2>
        <p className="text-sm text-muted-foreground pt-1">{description}</p>
        <div>{content}</div>;
      </div>
    );
  }

  return (
    <Dialog open={openState} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-base">
            {description}
          </DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}
