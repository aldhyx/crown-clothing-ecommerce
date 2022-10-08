import { useState } from "react";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input,component";
import './sign-in-form.style.scss';
import { useDispatch } from "react-redux";
import { emailSignInStart, googleSignInStart } from "../../store/user/user.action";
const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const dispatch = useDispatch();

    const signInWithGooglePopupHandler = async () => {
        dispatch(googleSignInStart())
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormFields(({ ...formFields, [name]: value }));
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            dispatch(emailSignInStart(email, password));
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/user-not-found':
                    alert('No user associate with this email');
                    break;
                case 'auth/wrong-password':
                    alert('Incorrect password for this email');
                    break;
                default:
                    console.log(error);
            }
        }
    }

    const resetFormFields = () => setFormFields(defaultFormFields)

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={onSubmitHandler}>
                <FormInput
                    label="Email"
                    type="email" required onChange={onChangeHandler} name="email" value={email}
                />
                <FormInput
                    label="Password"
                    type="password" required onChange={onChangeHandler} name="password" value={password}
                />

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>

                    {/* Sign In With Pop Up */}
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGooglePopupHandler}>
                        Google Sign In
                    </Button>
                </div>
            </form>
        </div>
    )
};

export default SignInForm;