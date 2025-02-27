export interface ExcelColumn {
  key: string; // Agora aceita qualquer string, incluindo chaves aninhadas
  label: string;
}


export interface ExcelExportOptions<T> {
  data: T[]; // Array de objetos a serem exportados
  columns: ExcelColumn[]; // Definição das colunas
  fileName: string; // Nome do arquivo
  sheetName?: string; // Nome da aba (opcional)
}
