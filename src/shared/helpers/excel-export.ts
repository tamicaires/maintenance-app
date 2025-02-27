import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { ExcelExportOptions } from "@/shared/types/excel-export";

/**
 * Acessa valores de propriedades aninhadas dinamicamente
 */
const getNestedValue = (obj: any, path: string): any => {
  return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : ""), obj);
};

/**
 * Exporta dados para um arquivo Excel
 */
export const exportToExcel = <T>({ data, columns, fileName, sheetName = "Sheet1" }: ExcelExportOptions<T>): void => {
  if (!data || data.length === 0) {
    console.error("Nenhum dado para exportar");
    return;
  }

  // Converte os dados para um formato estruturado, acessando chaves aninhadas
  const formattedData = data.map(item =>
    columns.map(col => getNestedValue(item, col.key))
  );

  // Criando os cabeçalhos da planilha
  const sheetData = [columns.map(col => col.label), ...formattedData];

  // Criando a planilha e o arquivo Excel
  const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  // Ajustando a largura das colunas
  worksheet["!cols"] = columns.map(col => ({ wch: col.label.length + 5 }));

  // Convertendo para buffer e salvando o arquivo
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const dataBlob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
  saveAs(dataBlob, `${fileName}.xlsx`);
};
