import { FC, ButtonHTMLAttributes } from "react";
import { BaseButton, GoogleSignInButton, InvertedButtonButton } from "./button.style";

export enum BUTTON_TYPE_CLASSES {
    google = 'google-sign-in',
    inverted = 'inverted',
    base = 'base'
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseButton =>
({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButtonButton,
}[buttonType]);

export type ButtonProps = {
    buttonType?: any;
    isLoading?: boolean;
    children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<ButtonProps> = ({ children, buttonType, isLoading, ...rest }) => {
    const CustomButton = getButton(buttonType);

    return (
        <CustomButton disabled={isLoading} {...rest}>
            {children}
        </CustomButton>
    )
}

export default Button;