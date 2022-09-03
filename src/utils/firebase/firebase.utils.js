import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
    if (!userAuth) return;
    /**
     * Used to check and get the doc references whether is exist or not
     * @param1 db instance
     * @param2 collection name (exist or not)
     * @param3 document id
     */
    const userDocRef = doc(db, 'users', userAuth.uid);

    /**
     * Trying to get the data whether is exist or not
     * @param1 doc reference
     */
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            /**
             * @param1 doc references
             * @param2 data to store
             */
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log("Error creating the user", error)
        }
    }

    return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return
    return await createUserWithEmailAndPassword(auth, email, password);
}