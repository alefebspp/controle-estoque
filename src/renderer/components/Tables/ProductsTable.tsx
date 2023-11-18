import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CrossCircledIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  MagnifyingGlassIcon,
  Pencil2Icon,
} from '@radix-ui/react-icons';

import {
  FilterFn,
  SortingState,
  Table,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';

import DebouncedInput from '../Input/DebounceFilter';
import ConfirmToast from '../ConfirmToast/ConfirmToast';

import { Product } from '../../types/types';

import { ProductsTableRootProps, ProductsTableHeaderProps } from './interface';
import { useDeleteProduct } from '../../hooks/useProducts';
import { showLoadingToast, dismissLoadingToast } from '../../lib/show-toast';

const ProductsTable = ({ products }: ProductsTableRootProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const navigate = useNavigate();
  const userHasProducts = products.length > 0;

  const { mutateAsync, isPending } = useDeleteProduct();

  const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the itemRank info
    addMeta({
      itemRank,
    });

    // Return if the item should be filtered in/out
    return itemRank.passed;
  };

  const columnHelper = createColumnHelper<Product>();

  const columns = [
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
    columnHelper.accessor('id', {
      header: () => 'Ações',
      cell: (info) => (
        <div className="w-full h-full flex justify-start items-center gap-[15px]">
          <ConfirmToast
            confirmFn={async () => await mutateAsync(info.getValue())}
          >
            <CrossCircledIcon className="w-4 h-4 text-red-500 cursor-pointer" />
          </ConfirmToast>
          <Pencil2Icon
            onClick={() => navigate(info.getValue())}
            className="w-4 h-4 text-secondary-light cursor-pointer"
          />
        </div>
      ),
      footer: (info) => info.column.id,
      enableSorting: false,
    }),
  ];

  const table = useReactTable({
    data: products,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: fuzzyFilter,
  });

  useEffect(() => {
    if (isPending) {
      showLoadingToast('Excluindo...');
    } else {
      dismissLoadingToast();
    }
  }, [isPending]);

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <ProductsTableHeader
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <div className="h-[100%] overflow-y-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th scope="col" className="px-6 py-3" key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none flex'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: <ArrowUpIcon />,
                          desc: <ArrowDownIcon />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    scope="row"
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {userHasProducts && <ProductsTablePagination table={table} />}
      </div>
    </div>
  );
};

const ProductsTableHeader = ({
  globalFilter,
  setGlobalFilter,
}: ProductsTableHeaderProps) => {
  return (
    <div className="w-full py-[15px] flex justify-start items-start gap-[30px]">
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-graphite-400">
          Buscar
        </label>
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={(value) => setGlobalFilter(String(value))}
          className="w-[250px] min-w-[250px]"
          name="description"
          placeholder="Procurar"
        >
          <MagnifyingGlassIcon className="mr-2" />
        </DebouncedInput>
      </div>
    </div>
  );
};

const ProductsTablePagination = ({ table }: { table: Table<Product> }) => {
  return (
    <div className="py-[15px] flex items-center justify-center gap-2">
      <button
        className="border rounded p-1"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        <DoubleArrowLeftIcon />
      </button>
      <button
        className="border rounded p-1"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronLeftIcon />
      </button>
      <button
        className="border rounded p-1"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <ChevronRightIcon />
      </button>
      <button
        className="border rounded p-1"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        <DoubleArrowRightIcon />
      </button>
      <span className="flex items-center gap-1">
        <div>Página</div>
        <strong>
          {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </strong>
      </span>
      <span className="flex items-center gap-1">
        | Ir para página:
        <input
          type="number"
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
          className="border p-1 rounded w-16"
        />
      </span>
    </div>
  );
};

export default ProductsTable;
