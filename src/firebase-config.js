import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import 'firebase/auth';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyAm_0GL5FxEO9YPrAn_wp5HhBFVPW6lXEM',
  authDomain: 'twitter-project-a2bb5.firebaseapp.com',
  projectId: 'twitter-project-a2bb5',
  storageBucket: 'twitter-project-a2bb5.appspot.com',
  messagingSenderId: '385642305951',
  appId: '1:385642305951:web:3d62db9c9bf32487f445aa',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
