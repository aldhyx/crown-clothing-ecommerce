import './checkout-item.style.scss';

import React, { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const { addItemToCart, removeItemToCart, clearItemToCart } = useContext(CartContext);

    const clearItemToCartHandler = () => clearItemToCart(cartItem);
    const addItemToCartHandler = () => addItemToCart(cartItem);
    const removeItemToCartHandler = () => removeItemToCart(cartItem);

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={name} />
            </div>

            <span className='name'>
                {name}
            </span>

            <span className='quantity'>
                <div className='arrow' onClick={removeItemToCartHandler}>&#10094;</div>
                <span className='value'>
                    {quantity}
                </span>
                <div className='arrow' onClick={addItemToCartHandler}>&#10095;</div>
            </span>

            <span className='price'>
                ${price}
            </span>

            <div className="remove-button" onClick={clearItemToCartHandler}>&#10005;</div>
        </div>
    )
}

export default CheckoutItem