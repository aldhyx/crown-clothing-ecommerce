import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    NextOrObserver
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs,  QueryDocumentSnapshot } from 'firebase/firestore'
import { Category } from '../../store/catagories/category.types';

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

export type ObjectToAdd = {
    title: string
}

// set collection data to firestore
export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
    collectionKey: string,
    objectsToAdd: T[]
): Promise<void> => {
    // get the collection references whether it exist or no
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach(object => {
        // get the doc references from collection references whether it exist or no
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
}

// before use this func, you need to run addCollectionAndDocuments once
export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data() as Category);
}

export type AdditionalInformation = {
    displayName?: string
} 
export type UserData = {
    createdAt: Date;
    displayName: string;
    email: string
}

export const createUserDocumentFromAuth = async (
    userAuth: User,
    additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
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

    return userSnapshot as QueryDocumentSnapshot<UserData>;
}

export const createAuthUserWithEmailAndPassword = async (email: string, password: string)  => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = () => signOut(auth);

export const onAuthStateChangeListener = (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                // immediately unsubscribe after get the userAuth
                unsubscribe();
                resolve(userAuth);
            },
            reject
        )
    })
}