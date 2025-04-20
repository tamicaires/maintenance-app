import { createContext, useState, useContext, type ReactNode, type ReactElement } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface DialogOptions {
  title?: string
  content: ReactElement
  onClose?: () => void
  // Predefined size options for better Tailwind compatibility
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full"
  // New option to control stacking behavior
  stackable?: boolean
}

interface DialogInstance extends DialogOptions {
  id: string
  isOpen: boolean
}

interface DialogContextProps {
  openDialog: (options: DialogOptions) => string // Returns dialog ID
  closeDialog: (id?: string) => void // Close specific dialog or most recent
  closeAllDialogs: () => void // Close all dialogs
}

const DialogContext = createContext<DialogContextProps | undefined>(undefined)

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [dialogs, setDialogs] = useState<DialogInstance[]>([])

  // Open a new dialog and return its ID
  const openDialog = (options: DialogOptions) => {
    const id = crypto.randomUUID()

    setDialogs((prevDialogs) => {
      // If not stackable, close other dialogs first
      const updatedDialogs = options.stackable
        ? prevDialogs
        : prevDialogs.map((dialog) => ({ ...dialog, isOpen: false }))

      return [...updatedDialogs, { ...options, id, isOpen: true }]
    })

    return id
  }

  // Close a specific dialog by ID or the most recent one
  const closeDialog = (id?: string) => {
    if (id) {
      // Close specific dialog
      setDialogs((prevDialogs) => {
        const dialogToClose = prevDialogs.find((d) => d.id === id)

        if (dialogToClose?.onClose) {
          dialogToClose.onClose()
        }

        return prevDialogs.filter((d) => d.id !== id)
      })
    } else {
      // Close most recent dialog
      setDialogs((prevDialogs) => {
        if (prevDialogs.length === 0) return prevDialogs

        const lastDialog = prevDialogs[prevDialogs.length - 1]
        if (lastDialog.onClose) {
          lastDialog.onClose()
        }

        return prevDialogs.slice(0, -1)
      })
    }
  }

  // Close all dialogs
  const closeAllDialogs = () => {
    // Call onClose for each dialog
    dialogs.forEach((dialog) => {
      if (dialog.onClose) {
        dialog.onClose()
      }
    })

    setDialogs([])
  }

  // Map size options to Tailwind classes
  const getSizeClass = (size?: string) => {
    switch (size) {
      case "sm":
        return "max-w-sm"
      case "md":
        return "max-w-md"
      case "lg":
        return "max-w-lg"
      case "xl":
        return "max-w-xl"
      case "2xl":
        return "max-w-2xl"
      case "3xl":
        return "max-w-3xl"
      case "full":
        return "max-w-full"
      default:
        return "max-w-md" // Default size
    }
  }

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog, closeAllDialogs }}>
      {children}

      {dialogs.map((dialog) => (
        <Dialog key={dialog.id} open={dialog.isOpen} onOpenChange={(open) => !open && closeDialog(dialog.id)}>
          <DialogContent className={`${getSizeClass(dialog.size)}`} onInteractOutside={() => closeDialog(dialog.id)}>
            {dialog.title && (
              <DialogHeader>
                <DialogTitle className="sr-only">{dialog.title}</DialogTitle>
              </DialogHeader>
            )}
            {dialog.content}
          </DialogContent>
        </Dialog>
      ))}
    </DialogContext.Provider>
  )
}

export const useDialog = (): DialogContextProps => {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider")
  }
  return context
}
