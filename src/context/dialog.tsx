import {
  createContext,
  useState,
  useContext,
  type ReactNode,
  type ReactElement,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DialogOptions {
  title?: string;
  content: ReactElement;
  onClose?: () => void;
  // Opções de tamanho predefinidas para melhor compatibilidade com Tailwind
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
}

interface DialogContextProps {
  openDialog: (options: DialogOptions) => void;
  closeDialog: () => void;
}

const DialogContext = createContext<DialogContextProps | undefined>(undefined);

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [dialogOptions, setDialogOptions] = useState<DialogOptions | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = (options: DialogOptions) => {
    setDialogOptions(options);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    if (dialogOptions?.onClose) {
      dialogOptions.onClose();
    }
  };

  // Mapeia as opções de tamanho para classes Tailwind
  const getSizeClass = (size?: string) => {
    switch (size) {
      case "sm":
        return "max-w-sm";
      case "md":
        return "max-w-md";
      case "lg":
        return "max-w-lg";
      case "xl":
        return "max-w-xl";
      case "2xl":
        return "max-w-2xl";
      case "3xl":
        return "max-w-3xl";
      case "full":
        return "max-w-full";
      default:
        return "max-w-md"; // Tamanho padrão
    }
  };

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}

      {dialogOptions && (
        <Dialog open={isOpen} onOpenChange={(open) => !open && closeDialog()}>
          <DialogContent
            className={`${getSizeClass(dialogOptions.size)}`}
            onInteractOutside={closeDialog}
          >
            {dialogOptions.title && (
              <DialogHeader>
                <DialogTitle hidden>{dialogOptions.title}</DialogTitle>
              </DialogHeader>
            )}
            {dialogOptions.content}
          </DialogContent>
        </Dialog>
      )}
    </DialogContext.Provider>
  );
};

export const useDialog = (): DialogContextProps => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog deve ser usado dentro de um DialogProvider");
  }
  return context;
};
