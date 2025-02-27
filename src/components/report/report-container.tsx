import { cn } from "@/lib/utils";

type ReportContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function ReportContainer({ children, className }: ReportContainerProps) {
  return (
    <div
      className={cn(
        "flex min-h-screen flex-col mt-16 bg-background rounded-sm px-6",
        className
      )}
    >
      {children}
    </div>
  );
}
