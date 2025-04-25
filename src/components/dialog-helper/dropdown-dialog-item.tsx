import type { ReactNode } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useDialog } from "@/core/providers/dialog";
import type { DialogOptions } from "@/core/providers/dialog";

type DropdownDialogItemProps = {
  children: ReactNode;
  dialogOptions: Omit<DialogOptions, "content"> & {
    content: ReactNode;
  };
};

export function DropdownDialogItem({
  children,
  dialogOptions,
}: DropdownDialogItemProps) {
  const { scheduleDialog } = useDialog();

  const handleClick = () => {
    scheduleDialog(dialogOptions as DialogOptions);
  };

  return <DropdownMenuItem onClick={handleClick}>{children}</DropdownMenuItem>;
}
