import { useState } from "react";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input,component";
import './sign-up-form.style.scss';

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
            dispatch(signUpStart(email, password, displayName))
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            }
        }
    }

    const resetFormFields = () => setFormFields(defaultFormFields)

    return (
        <div className="sign-up-container">
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
        </div>
    )
};

export default SignUpForm;