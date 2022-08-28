import React from 'react'
import { createUserDocumentFromAuth, signInWithGooglePopup } from '../../utils/firebase/firebase.utils'

const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user)
    }

    return (
        <div>
            <h1>SignIn Page</h1>
            <button onClick={logGoogleUser}>
                button Sign In With Google Popup
            </button>
        </div>
    )
}

export default SignIn