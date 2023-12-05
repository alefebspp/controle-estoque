export interface CreateMovementRequest {
  user_id: string;
  product_id: string;
  quantity: number;
  type: string;
  date: string;
  stablishment_id: string;
}

export interface GetMovementsRequest {
  user_id: string;
  from: string;
  to: string;
  stablishmentId: string;
}
