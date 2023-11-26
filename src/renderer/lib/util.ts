import { clsx, type ClassValue } from 'clsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { downloadExcel } from 'react-export-table-to-excel';
import { twMerge } from 'tailwind-merge';

interface IGeneratePDFProps {
  tableData?: any;
  tableTitle?: string | string[];
  tableHeaders?: string[][];
  fileName?: string;
}

interface IGenerateExcelProps {
  fileName: string;
  sheet: string;
  tableHeader: string[];
  tableBody: any;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  const splitedDate = date.split('-');
  const day = splitedDate[2];
  const month = splitedDate[1];
  const year = splitedDate[0];

  return `${day}/${month}/${year}`;
}

export function generateExcel({
  fileName,
  sheet,
  tableBody,
  tableHeader,
}: IGenerateExcelProps) {
  downloadExcel({
    fileName: fileName,
    sheet: sheet,
    tablePayload: {
      header: tableHeader,
      body: tableBody,
    },
  });
}

export function generatePdf({
  tableData,
  tableHeaders,
  tableTitle,
  fileName,
}: IGeneratePDFProps) {
  const unit = 'pt';
  const size = 'A4'; // Use A1, A2, A3 or A4
  const orientation = 'portrait'; // portrait or landscape

  const marginLeft = 40;
  const doc = new jsPDF(orientation, unit, size);

  doc.setFontSize(15);

  const title = tableTitle;
  const headers = tableHeaders;

  const data = tableData;

  autoTable(doc, {
    head: headers,
    body: data,
    startY: 50,
  });
  if (title) doc.text(title, marginLeft, 40);
  doc.save(fileName);
}
