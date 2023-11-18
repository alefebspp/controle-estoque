export interface User {
  name: string;
  id: string;
}

export interface Product {
  id: string;
  user_id: string;
  description: string;
  sell_value: number;
  stock_quantity: number;
  created_at: Date;
}
