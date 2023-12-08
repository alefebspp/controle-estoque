import {
  deleteDoc,
  doc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

import { db } from '../config/db/firebase';
import { movementsRef } from '../config/db/collections';
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
  stablishmentId,
}: GetMovementsRequest): Promise<GetMovementsResponse> => {
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
    where('stablishment_id', '==', stablishmentId),
    where('created_at', '>=', fromDate),
    where('created_at', '<=', toDate),
  );

  const docSnap = await getDocs(q);

  const movements: Movement[] = [];

  const response = await getProducts({
    userId: user_id,
    stablishmentId,
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

  await setDoc(doc(movementsRef), formatedMovement);

  return {
    success: true,
    message: 'Movimento criado com sucesso!',
  };
};

export const deleteMovement = async (
  movementId: string,
): Promise<DefaultResponse> => {
  let q = query(movementsRef, where('id', '==', movementId), limit(1));

  const docSnap = await getDocs(q);

  if (docSnap.empty) {
    return {
      success: false,
      message: 'Movimento não existe',
    };
  }

  const docId = docSnap.docs[0].id;
  const movement = docSnap.docs[0].data() as Movement;

  const movementDocRef = doc(db, 'movement', docId);

  const { product, success, message } = await findProduct(movement.product_id);

  if (!success) {
    return {
      success: false,
      message,
    };
  }

  if (product && success) {
    await deleteDoc(movementDocRef).then(async () => {
      await updateProduct({
        productId: movement.product_id,
        data: {
          ...product,
          stock_quantity:
            movement.type == 'ENTRADA'
              ? product.stock_quantity - movement.quantity
              : product.stock_quantity + movement.quantity,
        },
      });
    });
  }

  return {
    success: true,
    message: 'Movimento deletado',
  };
};
