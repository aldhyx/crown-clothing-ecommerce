import { ChangeEvent, FormEvent, useState } from 'react';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import FormInput from '../form-input/form-input,component';
import { useDispatch } from 'react-redux';
import {
    emailSignInStart,
    googleSignInStart,
} from '../../store/user/user.action';
import { ButtonContainer, SignInContainer } from './sign-in-form.style';
import { AuthError, AuthErrorCodes } from 'firebase/auth';
const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const dispatch = useDispatch();

    const signInWithGooglePopupHandler = async () => {
        dispatch(googleSignInStart());
    };

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            dispatch(emailSignInStart(email, password));
            resetFormFields();
        } catch (error) {
            if ((error as AuthError).code === AuthErrorCodes.USER_DELETED) {
                alert('No user associate with this email');
            }
            if ((error as AuthError).code === AuthErrorCodes.INVALID_PASSWORD) {
                alert('Incorrect password for this email');
            }
        }
    };

    const resetFormFields = () => setFormFields(defaultFormFields);

    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={onSubmitHandler}>
                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={onChangeHandler}
                    name="email"
                    value={email}
                />
                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={onChangeHandler}
                    name="password"
                    value={password}
                />

                <ButtonContainer>
                    <Button type="submit">Sign In</Button>

                    {/* Sign In With Pop Up */}
                    <Button
                        type="button"
                        buttonType={BUTTON_TYPE_CLASSES.google}
                        onClick={signInWithGooglePopupHandler}
                    >
                        Google Sign In
                    </Button>
                </ButtonContainer>
            </form>
        </SignInContainer>
    );
};

export default SignInForm;
