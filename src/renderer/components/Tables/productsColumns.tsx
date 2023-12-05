import { createColumnHelper } from '@tanstack/react-table';
import { Product } from '../../types/types';

const columnHelper = createColumnHelper<Product>();

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
