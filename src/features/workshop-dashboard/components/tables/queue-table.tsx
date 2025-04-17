import { ReportTable } from "@/components/data-table/data-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { queueColumns } from "../../data/queue-collumns";
import { DailyData } from "../../pages";

export type QueueTableProps = {
  maintenances: DailyData[];
  isLoading: boolean;
};

export function QueueTable({ maintenances, isLoading }: QueueTableProps) {
  console.log("maintenances", maintenances);
  return (
    <ScrollArea>
      <ReportTable
        columns={queueColumns}
        searchColumn="fleetNumber"
        data={maintenances}
        isloadingData={isLoading}
        onPaginationChange={() => {}}
        totalItems={maintenances.length || 0}
      />
    </ScrollArea>
  );
}
