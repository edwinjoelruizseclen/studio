import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './firebase-config';

// Initialize Firebase
const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(firebaseApp, {
  persistence: undefined,
  initializeWithValue: {
    authDomain: firebaseConfig.authDomain,
  }
});


export { auth, firebaseApp };
