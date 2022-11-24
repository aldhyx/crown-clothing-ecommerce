import { FC } from "react";
import { CartItem as TCartItem } from "../../store/cart/cart.types";
import { CartItemContainer } from "./cart-item.style";

type CartItemProps = {
    cartItem: TCartItem
}

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
    const { name, price, imageUrl, quantity } = cartItem;
    return (
        <CartItemContainer>
            <img src={imageUrl} alt={name} />
            <div className='item-details'>
                <h2 className='name'>{name}</h2>
                <span>{quantity} x ${price}</span>
            </div>
        </CartItemContainer>
    )
}

export default CartItem;