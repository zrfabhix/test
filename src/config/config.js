import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {

    apiKey: "AIzaSyD8A6ZM9nSE0RbmfCbqHLdbC3rWchctmgg",

    authDomain: "ishare-6a4c5.firebaseapp.com",
  
    projectId: "ishare-6a4c5",
  
    storageBucket: "ishare-6a4c5.appspot.com",
  
    messagingSenderId: "759921543118",
  
    appId: "1:759921543118:web:b7666f82a5884ee7cf0d9f"
  

};


firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

export { db, auth , storage}