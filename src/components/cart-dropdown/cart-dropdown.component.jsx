import Button from '../button/button.component';
import '../cart-dropdown/cart-dropdown.style.scss';


const CartDropdown = () => {
    return (
        <div className='cart-dropdown-container'>
            <div className="cart-items" />
            <Button buttonType="">GO TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown;