import { Product } from '../../types';
import { DefaultResponse } from '../response';

export type GetProductsResponse = Omit<DefaultResponse, 'data'> & {
  products: Product[];
};

export type FindProductResponse = Omit<DefaultResponse, 'data'> & {
  product?: Product;
};
