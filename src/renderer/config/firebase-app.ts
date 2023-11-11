import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAfqbzDl4UlUSpDegwwPNqAHe3C1nOmMJ4',
  authDomain: 'controle-estoque-96d8a.firebaseapp.com',
  projectId: 'controle-estoque-96d8a',
  storageBucket: 'controle-estoque-96d8a.appspot.com',
  messagingSenderId: '681437577378',
  appId: '1:681437577378:web:74ace5d1b38687b553d7fb',
  measurementId: 'G-GPZ18XHWYC',
};
// Initialize Firebase

export const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
