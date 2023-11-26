import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

import { db } from '../config/db/firebase';
import { generateUUID } from '../lib/helpers/generate-uuid';
import { formatDate } from '../lib/util';

import {
  CreateMovementRequest,
  GetMovementsRequest,
} from '../types/services/movement/request';
import { DefaultResponse } from '../types/services/response';
import { Movement, MovementType } from '../types/types';
import { GetMovementsResponse } from '../types/services/movement/response';

import { findProduct, getProducts, updateProduct } from './products';

export const getMovements = async ({
  user_id,
  from,
  to,
}: GetMovementsRequest): Promise<GetMovementsResponse> => {
  const movementsRef = collection(db, 'movement');

  const currentDate = new Date();

  const lastDayOfMonth = new Date(
    currentDate.getUTCFullYear(),
    currentDate.getUTCMonth() + 1,
    0,
  ).getUTCDate();

  const fromDate = new Date(`${from}-01`);
  const toDate = new Date(`${to}-${lastDayOfMonth}`);

  let q = query(
    movementsRef,
    where('user_id', '==', user_id),
    where('created_at', '>=', fromDate),
    where('created_at', '<=', toDate),
  );

  const docSnap = await getDocs(q);

  const movements: Movement[] = [];

  const response = await getProducts({
    userId: user_id,
    fetchProductsTotal: false,
  });

  const userProducts = response.products;

  docSnap.forEach((doc) => {
    const movement = doc.data() as Movement;
    const movementProduct = userProducts.find(
      (product) => product.id == movement.product_id,
    );
    movement.product = movementProduct;
    movements.push(movement);
  });

  return {
    success: true,
    message: '',
    movements,
  };
};

export const createMovement = async (
  data: CreateMovementRequest,
): Promise<DefaultResponse> => {
  const movementRef = collection(db, 'movement');

  const findProductResponse = await findProduct(data.product_id);

  if (!findProductResponse.product) {
    return {
      success: false,
      message: findProductResponse.message,
    };
  }

  const product = findProductResponse.product;

  const movementType = data.type;
  let productNewStockQuantity: number;

  if (movementType == MovementType.INFLOW) {
    productNewStockQuantity = product.stock_quantity += data.quantity;
  } else {
    productNewStockQuantity = product.stock_quantity -= data.quantity;
  }

  if (productNewStockQuantity < 0) {
    return {
      success: false,
      message: 'Quantidade ultrapassou o estoque',
    };
  }

  const updateProductResponse = await updateProduct({
    productId: data.product_id,
    data: { stock_quantity: productNewStockQuantity },
  });

  if (!updateProductResponse.success) {
    return {
      success: false,
      message: updateProductResponse.message,
    };
  }

  const formatedMovement = {
    ...data,
    date: formatDate(data.date),
    id: generateUUID(),
    created_at: new Date(data.date),
  };

  await setDoc(doc(movementRef), formatedMovement);

  return {
    success: true,
    message: 'Movimento criado com sucesso!',
  };
};
