import React from 'react'
import { signInWithGooglePopup } from '../../utils/firebase/firebase.utils'

const SignIn = () => {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup()
        console.log("🚀 ~ file: sign-in.component.jsx ~ line 7 ~ logGoogleUser ~ response", response)
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