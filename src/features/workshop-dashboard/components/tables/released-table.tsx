import { ReportTable } from "@/components/data-table/data-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DailyData } from "../../pages";
import { releasedColumns } from "../../data/released-collumns";

export type ReleasedTableProps = {
  maintenances: DailyData[];
  isLoading: boolean;
};

export function ReleasedTable({ maintenances, isLoading }: ReleasedTableProps) {
  return (
    <ScrollArea>
      <ReportTable
        columns={releasedColumns}
        searchColumn="fleetNumber"
        data={maintenances}
        isloadingData={isLoading}
        onPaginationChange={() => {}}
        totalItems={maintenances.length || 0}
      />
    </ScrollArea>
  );
}
