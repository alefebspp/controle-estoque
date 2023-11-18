import { Product } from '../../types/types';
import { Dispatch, SetStateAction } from 'react';

export interface ProductsTableRootProps {
  products: Product[];
}

export interface ProductsTableHeaderProps {
  globalFilter: string;
  setGlobalFilter: Dispatch<SetStateAction<string>>;
}
