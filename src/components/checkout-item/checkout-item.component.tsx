import { FC } from 'react';
import { selectCartItems } from '../../store/cart/cart.selector';
import {
    addItemToCart,
    clearItemToCart,
    removeItemToCart,
} from '../../store/cart/cart.action';
import { useDispatch, useSelector } from 'react-redux';
import { CheckoutItemContainer } from './checkout-item.style';
import { CartItem } from '../../store/cart/cart.types';

type CheckoutItemProps = {
    cartItem: CartItem
}

const CheckoutItem: FC<CheckoutItemProps> = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

    const clearItemToCartHandler = () =>
        dispatch(clearItemToCart(cartItems, cartItem));
    const addItemToCartHandler = () =>
        dispatch(addItemToCart(cartItems, cartItem));
    const removeItemToCartHandler = () =>
        dispatch(removeItemToCart(cartItems, cartItem));

    return (
        <CheckoutItemContainer>
            <div className="image-container">
                <img src={imageUrl} alt={name} />
            </div>

            <span className="name">{name}</span>

            <span className="quantity">
                <div className="arrow" onClick={removeItemToCartHandler}>
                    &#10094;
                </div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={addItemToCartHandler}>
                    &#10095;
                </div>
            </span>

            <span className="price">${price}</span>

            <div className="remove-button" onClick={clearItemToCartHandler}>
                &#10005;
            </div>
        </CheckoutItemContainer>
    );
};

export default CheckoutItem;
