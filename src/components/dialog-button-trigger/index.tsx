import { DialogSize, useDialog } from "@/core/providers/dialog";
import { Button } from "../ui/button";

type DialogButtonTriggerProps = {
  title: string;
  size?: DialogSize;
  variant?: "default" | "secondary" | "ghost";
  content: React.ReactElement;
  children: React.ReactNode;
};

export function DialogButtonTrigger({
  title,
  size = "xl",
  variant = "default",
  content,
  children,
}: DialogButtonTriggerProps) {
  const { openDialog } = useDialog();

  return (
    <Button
      variant={variant}
      size="sm"
      onClick={() => openDialog({ title, size, content })}
    >
      {children}
    </Button>
  );
}
