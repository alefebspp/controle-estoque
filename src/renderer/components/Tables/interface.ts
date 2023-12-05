import { Movement, Product } from '../../types/types';
import { Dispatch, SetStateAction } from 'react';

export interface ProductsTableProps {
  products: Product[];
  showTotal?: boolean;
  total?: number;
}

export interface MovementsTableProps {
  movements: Movement[];
  extraFilters?: React.ReactNode;
}

export interface MovementsTableHeaderProps {
  globalFilter: string;
  setGlobalFilter: Dispatch<SetStateAction<string>>;
  extraFilters?: React.ReactNode;
}

export interface ProductsTableHeaderProps {
  globalFilter: string;
  setGlobalFilter: Dispatch<SetStateAction<string>>;
  downloadData?: boolean;
  extraFilters?: React.ReactNode;
  products: Product[];
}
