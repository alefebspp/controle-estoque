export interface CreateProductRequest {
  description: string;
  sell_value: number;
  stock_quantity: number;
  created_at: Date;
  userId: string;
  stablishment_id: string;
}

export interface GetProductsParams {
  userId: string;
  stablishmentId: string;
}

export interface UpdateProductParams {
  productId: string;
  data: {
    description?: string;
    sell_value?: number;
    stock_quantity?: number;
  };
}
