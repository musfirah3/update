import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyB7h3J7BufR4CNOjOt_S1du5xjrbeOZrSo",
  authDomain: "ecommerce-api-storage-c3381.firebaseapp.com",
  projectId: "ecommerce-api-storage-c3381",
  storageBucket: "ecommerce-api-storage-c3381.appspot.com",
  messagingSenderId: "135615887796",
  appId: "1:135615887796:web:d1e36f635fa371580fdae1"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)