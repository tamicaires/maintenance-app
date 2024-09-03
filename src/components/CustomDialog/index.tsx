import React, { useRef, useEffect } from "react";
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
  header?: boolean;
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
  header = true,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".select-content")
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
      <div className="fixed inset-0 z-50 bg-black/70" aria-hidden="true" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          className="relative max-w-full w-auto bg-background p-6 shadow-lg rounded-lg overflow-hidden"
        >
          {header && (
            <div className="flex flex-col space-y-1.5 text-center sm:text-left">
              <h2
                id="dialog-title"
                className="text-lg font-semibold leading-none tracking-tight"
              >
                {title}
              </h2>
              {description && (
                <p className="text-sm text-gray-600">{description}</p>
              )}
            </div>
          )}

          <div className="mt-5 max-h-[calc(90vh-8rem)] overflow-y-auto">
            {children}
          </div>

          {footer && (
            <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
              <button
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-background border border-gray-300 hover:bg-gray-100 h-10 py-2 px-4 mt-2 sm:mt-0"
              >
                {cancelText}
              </button>
              {onConfirm && (
                <button
                  onClick={onConfirm}
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-background bg-blue-500 text-white hover:bg-blue-600 h-10 py-2 px-4"
                >
                  {confirmText}
                </button>
              )}
            </div>
          )}

          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-1 text-gray-500 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-background"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>
      </div>
    </>
  );
};
