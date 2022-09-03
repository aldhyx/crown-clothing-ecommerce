import React, { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import {
    auth,
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInWithGoogleRedirect,
} from '../../utils/firebase/firebase.utils';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
    const logGoogleUserPopup = async () => {
        // get user data from google after sign in
        const { user } = await signInWithGooglePopup();
        // create user doc in users collection on firebase
        const userDocRef = await createUserDocumentFromAuth(user);
    };

    const logGoogleUserRedirect = async () => {
        /**
         * Get user data from google after sign in
         * return null || object
         */
        const response = await getRedirectResult(auth);
        if (response) {
            const { user } = response;
            // create user doc in users collection on firebase
            const userDocRef = await createUserDocumentFromAuth(user);
        }
    };

    useEffect(() => {
        logGoogleUserRedirect();
    }, []);

    return (
        <>
            <div>
                <h1>SignIn Page</h1>
                <button onClick={logGoogleUserPopup}>
                    button Sign In With Google Popup
                </button>
                <button onClick={signInWithGoogleRedirect}>
                    button Sign In With Google Redirect
                </button>
            </div>
            <SignUpForm />
        </>
    );
};

export default SignIn;
