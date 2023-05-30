import { initializeApp, applicationDefault } from 'firebase-admin/app';
import {getFirestore} from "firebase-admin/firestore"
import admin from "firebase-admin"
const app = !admin.apps.length ? admin.initializeApp({
  credential:applicationDefault()
}) : admin.app();

const firestore =getFirestore()

export {
  firestore
}