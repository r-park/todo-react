import Firebase from 'firebase';
import { FIREBASE_URL } from 'config';

export const firebaseRef = new Firebase(FIREBASE_URL);
