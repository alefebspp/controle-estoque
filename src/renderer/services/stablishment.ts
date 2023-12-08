import {
  Timestamp,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

import {
  GetStablishmentResponse,
  GetStablishmentsResponse,
} from '../types/services/stablishment/responses';

import { stablishmentsRef, productsRef } from '../config/db/collections';

import { Product, Stablishment } from '../types/types';
import { DefaultResponse } from '../types/services/response';
import { generateUUID } from '../lib/helpers/generate-uuid';
import { CreateStablishmentRequest } from '../types/services/stablishment/requests';

export const getStablishments = async (
  user_id: string,
): Promise<GetStablishmentsResponse> => {
  let q = query(stablishmentsRef, where('user_id', '==', user_id));

  const docSnap = await getDocs(q);

  const stablishments: Stablishment[] = [];

  for (const doc of docSnap.docs) {
    const stablishment = doc.data() as Stablishment;

    let productsQuery = query(
      productsRef,
      where('user_id', '==', user_id),
      where('stablishment_id', '==', stablishment.id),
    );

    let productsTotal = 0;
    const productsDocSnap = await getDocs(productsQuery);
    productsDocSnap.forEach((doc) => {
      const product = doc.data() as Product;
      productsTotal += product.sell_value * product.stock_quantity;
    });
    stablishment.productsTotal = productsTotal;

    stablishments.push(stablishment);
  }

  return {
    success: true,
    message: '',
    stablishments,
  };
};

export const getStablishment = async (
  stablishment_id: string,
): Promise<GetStablishmentResponse> => {
  let q = query(stablishmentsRef, where('id', '==', stablishment_id));

  const docSnap = await getDocs(q);

  if (docSnap.empty) {
    return {
      success: false,
      message: 'Estabelecimento não existe',
    };
  }

  const stablishment = docSnap.docs[0].data() as Stablishment;

  return {
    success: true,
    message: '',
    stablishment,
  };
};

export const createStablishment = async ({
  userId,
  name,
}: CreateStablishmentRequest): Promise<DefaultResponse> => {
  const formatedStablishment = {
    created_at: Timestamp.fromDate(new Date()),
    id: generateUUID(),
    user_id: userId,
    name,
  };

  await setDoc(doc(stablishmentsRef), formatedStablishment);

  return {
    success: true,
    message: 'Estabelecimento criado com sucesso!',
  };
};
