import { createColumnHelper } from '@tanstack/react-table';
import { Product } from '../../types/types';

const columnHelper = createColumnHelper<Product>();

export const totalColumns = [
  columnHelper.accessor('description', {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    header: () => 'Produto',
  }),
  columnHelper.accessor('stock_quantity', {
    id: 'stockQuantity',
    header: () => 'Qtd. Estoque',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.stock_quantity * row.sell_value, {
    id: 'total',
    header: () => 'Total',
    cell: (info) => {
      return info.getValue().toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    },
    footer: (info) => info.column.id,
    sortingFn: (rowA, rowB, columnId) => {
      const numA = rowA.renderValue(columnId) as number;
      const numB = rowB.getValue(columnId) as number;

      return numA < numB ? 1 : numA > numB ? -1 : 0;
    },
  }),
];

export const productsColumns = [
  columnHelper.accessor('description', {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    header: () => 'Descrição',
  }),
  columnHelper.accessor('sell_value', {
    id: 'sellValue',
    cell: (info) => (
      <i>
        {info.getValue().toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </i>
    ),
    header: () => 'Valor de venda',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('stock_quantity', {
    header: () => 'Qtd. Estoque',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
];
