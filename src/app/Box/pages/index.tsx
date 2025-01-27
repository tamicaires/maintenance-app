import { EmptyCard } from "@/components/EmptyCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useActiveBoxes } from "../hooks/use-active-boxes";
import { IBoxWithRelationalData } from "@/shared/types/box";
import { MaintenanceCard } from "@/components/WorkShopDashboard/MaintenanceCard";
import { getDataOrDefault } from "@/utils/data";
import { Spinner } from "@/components/Spinner";

interface BoxesSectionProps {
  viewMode: "grid" | "list";
}

export function Boxes({ viewMode }: BoxesSectionProps) {
  const { data, isLoading } = useActiveBoxes();
  const boxes = getDataOrDefault<IBoxWithRelationalData[]>(data, [], "data");

  if (isLoading) {
    return <Spinner />;
  }

  if (viewMode === "list") {
    return (
      <ScrollArea className="h-[600px] rounded-md border">
        {/* <MaintenanceTable
          box={boxes}
          workOrders={boxesWithWorkOrders}
          onStatusChange={onStatusChange}
          onShowDetails={onShowDetails}
        /> */}
      </ScrollArea>
    );
  }

  if (viewMode === "grid") {
    return (
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
  }

  return null;
}
