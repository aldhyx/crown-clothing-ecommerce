import { AuthError, AuthErrorCodes } from "firebase/auth";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input,component";
import { SignUpContainer } from "./sign-up-form.style";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    passwordConfirmation: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, passwordConfirmation } = formFields;
    const dispatch = useDispatch();

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields(({ ...formFields, [name]: value }));
    }

    const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (password !== passwordConfirmation) {
            alert('Passwords do not match');
            return;
        }

        try {
            dispatch(signUpStart(email, password, displayName))
            resetFormFields();
        } catch (error) {
            if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
                alert('Cannot create user, email already in use');
            }
        }
    }

    const resetFormFields = () => setFormFields(defaultFormFields)

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={onSubmitHandler}>
                <FormInput
                    label="Name"
                    type="text" required onChange={onChangeHandler} name="displayName" value={displayName}
                />
                <FormInput
                    label="Email"
                    type="email" required onChange={onChangeHandler} name="email" value={email}
                />
                <FormInput
                    label="Password"
                    type="password" required onChange={onChangeHandler} name="password" value={password}
                />
                <FormInput
                    label=" Password Confirmation"
                    type="password" required onChange={onChangeHandler} name="passwordConfirmation" value={passwordConfirmation}
                />
                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    )
};

export default SignUpForm;