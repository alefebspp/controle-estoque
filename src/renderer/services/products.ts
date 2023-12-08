import {
  doc,
  setDoc,
  Timestamp,
  query,
  where,
  getDocs,
  limit,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';

import { generateUUID } from '../lib/helpers/generate-uuid';
import { productsRef } from '../config/db/collections';
import { db } from '../config/db/firebase';

import { Product } from '../types/types';
import { DefaultResponse } from '../types/services/response';
import {
  FindProductResponse,
  GetProductsResponse,
} from '../types/services/products/responses';
import {
  CreateProductRequest,
  GetProductsParams,
  UpdateProductParams,
} from '../types/services/products/requests';

export const findProduct = async (
  productId: string,
): Promise<FindProductResponse> => {
  let q = query(productsRef, where('id', '==', productId), limit(1));

  const docSnap = await getDocs(q);

  if (docSnap.empty) {
    return {
      success: false,
      message: 'Produto não existe',
    };
  }

  const product = docSnap.docs[0].data() as Product;

  return {
    success: true,
    message: 'Produto encontrado',
    product,
  };
};

export const updateProduct = async ({
  productId,
  data,
}: UpdateProductParams): Promise<DefaultResponse> => {
  let q = query(productsRef, where('id', '==', productId), limit(1));

  const docSnap = await getDocs(q);

  if (docSnap.empty) {
    return {
      success: false,
      message: 'Produto não existe',
    };
  }

  const docId = docSnap.docs[0].id;
  const productDocRef = doc(db, 'products', docId);

  await updateDoc(productDocRef, {
    ...data,
  });

  return {
    success: true,
    message: 'Produto atualizado',
  };
};

export const deleteProduct = async (
  productId: string,
): Promise<DefaultResponse> => {
  let q = query(productsRef, where('id', '==', productId), limit(1));

  const docSnap = await getDocs(q);

  if (docSnap.empty) {
    return {
      success: false,
      message: 'Produto não existe',
    };
  }

  const docId = docSnap.docs[0].id;
  const productDocRef = doc(db, 'products', docId);

  await deleteDoc(productDocRef);

  return {
    success: true,
    message: 'Produto deletado',
  };
};

export const getProducts = async ({
  userId,
  stablishmentId,
}: GetProductsParams): Promise<GetProductsResponse> => {
  let q = query(
    productsRef,
    where('user_id', '==', userId),
    where('stablishment_id', '==', stablishmentId),
  );

  const docSnap = await getDocs(q);

  const products: Product[] = [];

  docSnap.forEach((doc) => {
    const product = doc.data() as Product;
    products.push(product);
  });

  return {
    success: true,
    message: '',
    products,
  };
};

export const createProduct = async ({
  userId,
  ...params
}: CreateProductRequest): Promise<DefaultResponse> => {
  const { created_at, ...data } = params;

  if (!data.stablishment_id) {
    return {
      success: false,
      message: 'Selecione um estabelecimento',
    };
  }

  const formatedProduct = {
    ...data,
    created_at: Timestamp.fromDate(created_at),
    id: generateUUID(),
    user_id: userId,
  };

  await setDoc(doc(productsRef), formatedProduct);

  return {
    success: true,
    message: 'Produto criado com sucesso!',
  };
};
