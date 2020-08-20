import { config } from "./config";
import firebase from 'firebase';

firebase.initializeApp(config);

export const auth = firebase.auth();

export const date = firebase.firestore.FieldValue.serverTimestamp();

const settings = {};
firebase.firestore().settings(settings);
export const firestore = firebase.firestore();

export const firebasestore = firebase.firestore;
