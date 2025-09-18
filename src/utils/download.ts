import * as ExcelJS from 'exceljs';

type ColumnConfig = {
  header: string;
  key: string;
  width?: number;
};

export async function exportToCsv(columns: ColumnConfig[], data: any[], filename: string) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet1');

  // Set worksheet columns with widths
  worksheet.columns = columns.map((col) => ({
    header: col.header,
    key: col.key,
    width: col.width ?? Math.max(col.header.length + 5, 20)
  }));

  // Add rows from your data
  data.forEach((item) => {
    const row: any = {};
    columns.forEach((col) => {
      row[col.key] = item[col.key] ?? '';
    });
    worksheet.addRow(row);
  });

  // Generate Excel buffer
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });

  // Trigger download
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.xlsx') ? filename : `${filename}.xlsx`;
  a.click();
  URL.revokeObjectURL(url);
}
