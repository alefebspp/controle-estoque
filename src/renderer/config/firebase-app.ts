import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAfqbzDl4UlUSpDegwwPNqAHe3C1nOmMJ4',
  authDomain: 'controle-estoque-96d8a.firebaseapp.com',
  projectId: 'controle-estoque-96d8a',
  storageBucket: 'controle-estoque-96d8a.appspot.com',
  messagingSenderId: '681437577378',
  appId: '1:681437577378:web:74ace5d1b38687b553d7fb',
  measurementId: 'G-GPZ18XHWYC',
};

export const app = initializeApp(firebaseConfig);
