import { EmptyCard } from "@/components/EmptyCard";
import { useActiveBoxes } from "../../hooks/use-active-boxes";
import { IBoxWithRelationalData } from "@/shared/types/box";
import { MaintenanceCard } from "@/features/workshop-dashboard/components/maintenance-card";
import { getDataOrDefault } from "@/utils/data";
import { ReportTable } from "@/components/data-table/data-table";
import { boxesColumns } from "../../data/boxes-collums";
import { LoadingOverlay } from "@/components/loading-overlay";
import EmptyState from "@/components/states/empty-state";

type BoxesSectionProps = {
  viewMode: "grid" | "list";
};

export function BoxesView({ viewMode }: BoxesSectionProps) {
  const { data, isLoading } = useActiveBoxes();
  const boxes = getDataOrDefault<IBoxWithRelationalData[]>(data, []);

  const renderListView = () => (
    <ReportTable
      columns={boxesColumns}
      data={boxes}
      isloadingData={isLoading}
      totalItems={boxes.length}
      onPaginationChange={() => {}}
    />
  );

  const renderGridView = () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {boxes.map((box) => (
        <div key={box.id} className="h-full">
          {box.workOrder ? (
            <MaintenanceCard box={box} />
          ) : (
            <EmptyCard boxNumber={box.name} />
          )}
        </div>
      ))}
    </div>
  );

  const renderEmptyState = () => (
    <EmptyState
      message="Nenhum box encontrado"
      description="Verifique se possui boxes cadastrados"
    />
  );

  return (
    <LoadingOverlay isLoading={isLoading}>
      {boxes.length === 0
        ? renderEmptyState()
        : viewMode === "list"
        ? renderListView()
        : renderGridView()}
    </LoadingOverlay>
  );
}
