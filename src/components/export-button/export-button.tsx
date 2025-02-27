import { exportToExcel } from "@/shared/helpers/excel-export";
import { ExcelColumn } from "@/shared/types/excel-export";
import { Button } from "../ui/button";

interface ExportButtonProps<T> {
  data: T[];
  columns: ExcelColumn[];
  fileName?: string;
  sheetName?: string;
}

const ExportButton = <T,>({
  data,
  columns,
  fileName = "Export",
  sheetName = "Sheet1",
}: ExportButtonProps<T>) => {
  return (
    <Button
      variant="secondary"
      onClick={() => exportToExcel({ data, columns, fileName, sheetName })}
    >
      Exportar Relatório
    </Button>
  );
};

export default ExportButton;
