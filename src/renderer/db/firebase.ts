import { getFirestore } from 'firebase/firestore';
import { app } from '../config/firebase-app';

export const db = getFirestore(app);
