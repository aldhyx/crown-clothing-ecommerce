import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { selectCartItems, selectIsCartOpen } from '../../store/cart/cart.selector';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.style';

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const isCartOpen = useSelector(selectIsCartOpen);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
        dispatch(setIsCartOpen(!isCartOpen));
    };

    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length
                    ? cartItems.map(item => (<CartItem key={item.id} cartItem={item} />))
                    : (<EmptyMessage>Your cart is empty</EmptyMessage>)}
            </CartItems>

            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;