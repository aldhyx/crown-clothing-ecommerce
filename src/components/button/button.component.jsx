import './button.style.scss';

const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted',
}

const Button = ({ children, buttonType, ...rest }) => {
    return (
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...rest}>
            {children}
        </button>
    )
}

export default Button;