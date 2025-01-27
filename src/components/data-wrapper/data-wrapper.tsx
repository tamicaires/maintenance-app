import type React from "react";
import { Loader2 } from "lucide-react";

interface DataWrapperProps<T> {
  data: T[] | null | undefined;
  isLoading?: boolean;
  EmptyComponent?: React.ComponentType<{ message?: string }>;
  LoadingComponent?: React.ComponentType;
  children: (data: T[]) => React.ReactNode;
  emptyMessage?: string;
}

export function DataWrapper<T>({
  data,
  isLoading = false,
  EmptyComponent,
  LoadingComponent,
  children,
  emptyMessage = "Nenhum dado disponível",
}: DataWrapperProps<T>) {
  if (isLoading) {
    return LoadingComponent ? <LoadingComponent /> : <DefaultLoading />;
  }

  if (!data || data.length === 0) {
    return EmptyComponent ? (
      <EmptyComponent message={emptyMessage} />
    ) : (
      <DefaultEmpty message={emptyMessage} />
    );
  }

  return <>{children(data)}</>;
}

function DefaultLoading() {
  return (
    <div className="flex justify-center items-center p-4">
      <Loader2 className="w-6 h-6 animate-spin" />
    </div>
  );
}

function DefaultEmpty({ message }: { message: string }) {
  return (
    <div className="text-center p-4">
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}
