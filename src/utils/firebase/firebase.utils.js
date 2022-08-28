import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCFR0w9IeR8MGtCPo9_J0tcZ9ckaBVL1JQ",
    authDomain: "crown-clothing-c3a37.firebaseapp.com",
    projectId: "crown-clothing-c3a37",
    storageBucket: "crown-clothing-c3a37.appspot.com",
    messagingSenderId: "429935689591",
    appId: "1:429935689591:web:341215091e69b5157beb72"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);