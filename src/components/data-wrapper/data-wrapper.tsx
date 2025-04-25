import type React from "react";
import EmptyState from "../states/empty-state";
import { Spinner } from "../Spinner";

interface DataWrapperProps<T> {
  data: T[] | null | undefined;
  isLoading?: boolean;
  EmptyComponent?: React.ComponentType<{ message?: string }>;
  LoadingComponent?: React.ComponentType;
  children: (data: T[]) => React.ReactNode;
  emptyMessage?: string;
  emptyDescription?: string;
}

export function DataWrapper<T>({
  data,
  isLoading = false,
  EmptyComponent,
  LoadingComponent,
  children,
  emptyMessage = "Nenhum dado disponível",
  emptyDescription,
}: DataWrapperProps<T>) {
  if (isLoading) {
    return LoadingComponent ? <LoadingComponent /> : <DefaultLoading />;
  }

  if (!data || data.length === 0) {
    return EmptyComponent ? (
      <EmptyComponent message={emptyMessage} />
    ) : (
      <EmptyState message={emptyMessage} description={emptyDescription} />
    );
  }

  return <>{children(data)}</>;
}

function DefaultLoading() {
  return (
    <div className="flex justify-center items-center p-4">
      <Spinner />
    </div>
  );
}
