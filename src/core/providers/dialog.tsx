"use client";

import {
  createContext,
  useState,
  useContext,
  type ReactNode,
  type ReactElement,
  Suspense,
  useCallback,
  useMemo,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

export type DialogSize =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "full";

interface DialogOptions {
  title?: string;
  content: ReactElement;
  onClose?: () => void;
  // Predefined size options for better Tailwind compatibility
  size?: DialogSize;
  // New option to control stacking behavior
  stackable?: boolean;
  // New option for lazy loading
  lazyLoad?: boolean;
}

interface DialogInstance extends DialogOptions {
  id: string;
  isOpen: boolean;
}

interface DialogContextProps {
  openDialog: (options: DialogOptions) => string; // Returns dialog ID
  closeDialog: (id?: string) => void; // Close specific dialog or most recent
  closeAllDialogs: () => void; // Close all dialogs
}

const DialogContext = createContext<DialogContextProps | undefined>(undefined);

// Loading fallback component
const DialogLoadingFallback = () => (
  <div className="flex items-center justify-center w-full h-40">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [dialogs, setDialogs] = useState<DialogInstance[]>([]);

  // Memoize open dialogs to prevent unnecessary re-renders
  const openDialogs = useMemo(() => {
    return dialogs.filter((dialog) => dialog.isOpen);
  }, [dialogs]);

  // Get the top-most dialog (the one that should respond to outside clicks)
  const getTopMostDialogId = useCallback(() => {
    return openDialogs.length > 0
      ? openDialogs[openDialogs.length - 1].id
      : null;
  }, [openDialogs]);

  // Open a new dialog and return its ID
  const openDialog = useCallback((options: DialogOptions) => {
    const id = crypto.randomUUID();

    setDialogs((prevDialogs) => {
      // Always keep previous dialogs as they are when stackable is true
      if (options.stackable) {
        return [...prevDialogs, { ...options, id, isOpen: true }];
      } else {
        // If not stackable, mark all existing dialogs as closed
        const updatedDialogs = prevDialogs.map((dialog) => ({
          ...dialog,
          isOpen: false,
        }));

        // Remove all closed dialogs
        const filteredDialogs = updatedDialogs.filter(
          (dialog) => dialog.isOpen
        );

        return [...filteredDialogs, { ...options, id, isOpen: true }];
      }
    });

    return id;
  }, []);

  // Close a specific dialog by ID or the most recent one
  const closeDialog = useCallback((id?: string) => {
    if (id) {
      // Close specific dialog
      setDialogs((prevDialogs) => {
        const dialogToClose = prevDialogs.find((d) => d.id === id);

        if (dialogToClose?.onClose) {
          dialogToClose.onClose();
        }

        return prevDialogs.filter((d) => d.id !== id);
      });
    } else {
      // Close most recent dialog
      setDialogs((prevDialogs) => {
        if (prevDialogs.length === 0) return prevDialogs;

        const lastDialog = prevDialogs[prevDialogs.length - 1];
        if (lastDialog.onClose) {
          lastDialog.onClose();
        }

        return prevDialogs.slice(0, -1);
      });
    }
  }, []);

  // Close all dialogs
  const closeAllDialogs = useCallback(() => {
    // Call onClose for each dialog
    dialogs.forEach((dialog) => {
      if (dialog.onClose) {
        dialog.onClose();
      }
    });

    setDialogs([]);
  }, [dialogs]);

  // Map size options to Tailwind classes
  const getSizeClass = useCallback((size?: string) => {
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
      case "4xl":
        return "max-w-4xl";
      case "full":
        return "max-w-full";
      default:
        return "w-auto"; // Default size
    }
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      openDialog,
      closeDialog,
      closeAllDialogs,
    }),
    [openDialog, closeDialog, closeAllDialogs]
  );

  const topMostDialogId = getTopMostDialogId();

  return (
    <DialogContext.Provider value={contextValue}>
      {children}

      {/* Only render dialogs that are actually open */}
      {openDialogs.map((dialog) => {
        const isTopMostDialog = dialog.id === topMostDialogId;

        return (
          <Dialog
            key={dialog.id}
            open={true} // Always true since we're only rendering open dialogs
            onOpenChange={(open) => {
              if (!open) {
                closeDialog(dialog.id);
              }
            }}
          >
            <DialogContent
              className={`${getSizeClass(dialog.size)} p-0 gap-0`}
              // Only the top-most dialog should respond to outside clicks
              onInteractOutside={(e) => {
                if (isTopMostDialog) {
                  closeDialog(dialog.id);
                } else {
                  // Prevent closing for dialogs that aren't on top
                  e.preventDefault();
                }
              }}
            >
              {dialog.title && (
                <DialogHeader>
                  <DialogTitle className="sr-only">{dialog.title}</DialogTitle>
                </DialogHeader>
              )}

              {/* Conditionally wrap content in Suspense for lazy loading */}
              {dialog.lazyLoad ? (
                <Suspense fallback={<DialogLoadingFallback />}>
                  {dialog.content}
                </Suspense>
              ) : (
                dialog.content
              )}
            </DialogContent>
          </Dialog>
        );
      })}
    </DialogContext.Provider>
  );
};

export const useDialog = (): DialogContextProps => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};
