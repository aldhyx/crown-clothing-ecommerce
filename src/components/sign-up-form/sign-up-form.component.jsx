import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    passwordConfirmation: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, passwordConfirmation } = formFields;

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormFields(({ ...formFields, [name]: value }));
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (password !== passwordConfirmation) {
            alert('Passwords do not match');
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            }
        }
    }

    const resetFormFields = () => setFormFields(defaultFormFields)

    return (
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={onSubmitHandler}>
                <label >
                    Name
                </label>
                <input type="text" required onChange={onChangeHandler} name="displayName" value={displayName} />

                <label >
                    Email
                </label>
                <input type="email" required onChange={onChangeHandler} name="email" value={email} />

                <label >
                    Password
                </label>
                <input type="password" required onChange={onChangeHandler} name="password" value={password} />

                <label >
                    Password Confirmation
                </label>
                <input type="password" required onChange={onChangeHandler} name="passwordConfirmation" value={passwordConfirmation} />

                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
};

export default SignUpForm;