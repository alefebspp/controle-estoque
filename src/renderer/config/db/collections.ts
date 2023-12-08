import { collection } from 'firebase/firestore';

import { db } from './firebase';

export const movementsRef = collection(db, 'movement');
export const productsRef = collection(db, 'products');
export const stablishmentsRef = collection(db, 'stablishments');
