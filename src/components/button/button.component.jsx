import { BaseButton, GoogleSignInButton, InvertedButtonButton } from "./button.style";

export const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted',
    base: 'base'
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButtonButton,
}[buttonType]);

const Button = ({ children, buttonType, ...rest }) => {
    const CustomButton = getButton(buttonType);

    return (
        <CustomButton {...rest}>
            {children}
        </CustomButton>
    )
}

export default Button;