import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

interface DialogProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  footer?: boolean;
}

export const Dialog: React.FC<DialogProps> = ({
  title,
  description,
  children,
  isOpen,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  footer = false,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          className="relative w-full max-w-lg max-h-[85vh] overflow-auto bg-background p-6 shadow-lg duration-200 rounded-lg"
        >
          <div className="flex flex-col space-y-1.5 text-center sm:text-left">
            <h2
              id="dialog-title"
              className="text-lg font-semibold leading-none tracking-tight"
            >
              {title}
            </h2>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          <div className="mt-5">{children}</div>
          {footer && (
            <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
              <button
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4 mt-2 sm:mt-0"
              >
                {cancelText}
              </button>
              {onConfirm && (
                <button
                  onClick={onConfirm}
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
                >
                  {confirmText}
                </button>
              )}
            </div>
          )}

          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>
      </div>
    </>
  );
};

// Example usage of the Dialog component
export default function DialogExample() {
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  const handleConfirm = () => {
    console.log("Confirmed!");
    closeDialog();
  };

  return (
    <div>
      <button
        onClick={openDialog}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
      >
        Open Dialog
      </button>

      <Dialog
        title="Reusable Dialog"
        description="This is a reusable dialog component."
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onConfirm={handleConfirm}
        confirmText="Accept"
        cancelText="Decline"
      >
        <p>
          This is the content of the dialog. You can pass any React nodes as
          children.
        </p>
        <ul className="list-disc list-inside mt-2">
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </Dialog>
    </div>
  );
}
