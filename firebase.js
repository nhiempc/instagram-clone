// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyBwbGmSROVIMzjVS_pzl4Q-_zrTSlxfU60',
    authDomain: 'instagram-clone-35c7f.firebaseapp.com',
    projectId: 'instagram-clone-35c7f',
    storageBucket: 'instagram-clone-35c7f.appspot.com',
    messagingSenderId: '1093754370813',
    appId: '1:1093754370813:web:db97256282b8ff4a3d9c94'
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
const auth = getAuth();

export { app, db, storage, auth };
