// Import the functions you need from the SDKs you need
import { getAuth } from '@firebase/auth';
import { initializeApp } from 'firebase/app';

export const firebaseConfig = {
  apiKey: 'AIzaSyCH0auIBDT6TysM8IAKsQnT6tAo8YoTwHc',
  authDomain: 'react-auth-demo-78a39.firebaseapp.com',
  projectId: 'react-auth-demo-78a39',
  storageBucket: 'react-auth-demo-78a39.appspot.com',
  messagingSenderId: '685117827350',
  appId: '1:685117827350:web:9e771b1e2d75f4929fc837',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// https://firebase.google.com/docs/auth/web/start?hl=en&authuser=0
