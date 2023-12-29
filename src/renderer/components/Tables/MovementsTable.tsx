import { useState, useEffect } from 'react';

import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CrossCircledIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  MagnifyingGlassIcon,
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

import { Movement } from '../../types/types';

import { MovementsTableProps, MovementsTableHeaderProps } from './interface';
import { showLoadingToast, dismissLoadingToast } from '../../lib/show-toast';
import { cn } from '../../lib/util';
import { useDeleteMovement } from '../../hooks/useMovement';

const MovementsTable = ({ movements, extraFilters }: MovementsTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const userHasProducts = movements.length > 0;

  const { mutateAsync, isPending } = useDeleteMovement();

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

  const columnHelper = createColumnHelper<Movement>();

  const columns = [
    columnHelper.accessor('product', {
      cell: (info) => info.getValue()?.description,
      footer: (info) => info.column.id,
      header: () => 'Produto',
    }),
    columnHelper.accessor('type', {
      id: 'type',
      cell: (info) => (
        <i
          className={cn('', {
            'text-secondary-dark': info.getValue() == 'ENTRADA',
            'text-red-500': info.getValue() == 'SAÍDA',
          })}
        >
          {info.getValue()}
        </i>
      ),
      header: () => 'Tipo',
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('quantity', {
      header: () => 'Quantidade',
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('date', {
      header: () => 'Data',
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('id', {
      header: () => 'Ações',
      cell: (info) => (
        <div className="w-full h-full flex justify-start items-center gap-[1rem]">
          <ConfirmToast
            confirmFn={async () => await mutateAsync(info.getValue())}
          >
            <CrossCircledIcon className="w-4 h-4 text-red-500 cursor-pointer" />
          </ConfirmToast>
        </div>
      ),
      footer: (info) => info.column.id,
      enableSorting: false,
    }),
  ];

  const table = useReactTable({
    data: movements,
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
    <div className="w-full h-full flex flex-col">
      <ProductsTableHeader
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        extraFilters={extraFilters}
      />
      <div className="md:max-h-[300px] lg:max-h-[400px] 2xl:max-h-[700px] overflow-y-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs sticky top-0 text-graphite-500 uppercase bg-gray-200">
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
              <tr className="bg-white border-b border-gray-200" key={row.id}>
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
      </div>
      {userHasProducts && <ProductsTablePagination table={table} />}
    </div>
  );
};

const ProductsTableHeader = ({
  globalFilter,
  setGlobalFilter,
  extraFilters,
}: MovementsTableHeaderProps) => {
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
      {extraFilters ? extraFilters : null}
    </div>
  );
};

const ProductsTablePagination = ({ table }: { table: Table<Movement> }) => {
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

export default MovementsTable;
