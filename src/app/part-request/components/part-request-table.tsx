import { useEffect, useState } from "react";
import { ReportTable } from "@/components/data-table/data-table";
import { usePartRequests } from "@/app/part-request/hooks/use-part-requests";
import { RequestStatus } from "@/shared/enums/part-request";
import { partRequestColumns } from "../data/collums";
import { IPartRequestsRelationalDataList } from "@/shared/types/part-request-relational-data";
import { ITableFilterOption } from "@/components/data-table/data-table-toolbar";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { getDataOrDefault } from "@/utils/data";

const tabs = [
  { value: "all", label: "Todas", count: 0 },
  { value: "pending", label: "Pendentes", count: 0 },
  { value: "approved", label: "Aprovadas", count: 0 },
];

const filterOptions: ITableFilterOption[] = [
  {
    name: "Date Picker",
    render: <DateRangePicker onRangeChange={() => {}} />,
  },
];

export function PartRequestTable() {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const { data: partRequestData, isLoading: isPartRequestLoading } =
    usePartRequests({
      page: (currentPage + 1).toString(),
      perPage: itemsPerPage.toString(),
    });

  const partRequestObjects = partRequestData?.data;
  const requests: IPartRequestsRelationalDataList = {
    partRequests: getDataOrDefault(partRequestObjects, [], "data"),
    total: partRequestData?.data?.total || 0,
  };

  const totalRequests = partRequestData?.data?.total || 0;

  useEffect(() => {
    if (requests.partRequests.length > 0) {
      tabs[0].count = totalRequests;
      tabs[1].count = requests.partRequests.filter(
        (r) => r.status === RequestStatus.PENDING
      ).length;
      tabs[2].count = requests.partRequests.filter(
        (r) => r.status === RequestStatus.APPROVED
      ).length;
    }
  }, [requests, totalRequests]);

  const handlePaginationChange = (pageIndex: number, pageSize: number) => {
    setCurrentPage(pageIndex);
    setItemsPerPage(pageSize);
  };
  const partRequests =
    partRequestData?.data?.partRequests.map((request) => {
      return {
        ...request,
      };
    }) || [];

  return (
    <ReportTable
      columns={partRequestColumns}
      searchColumn="part"
      data={partRequests}
      filterOptions={filterOptions}
      isloadingData={isPartRequestLoading}
      totalItems={totalRequests}
      onPaginationChange={handlePaginationChange}
    />
  );
}
