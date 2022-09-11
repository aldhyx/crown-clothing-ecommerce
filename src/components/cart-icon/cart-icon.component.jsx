import './cart-icon.style.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';

const CartIcon = () => {
  const { setIsCartOpen, cartItems } = useContext(CartContext);

  return (
    <div className='cart-icon-container' onClick={() => setIsCartOpen(prev => !prev)}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{cartItems.length}</span>
    </div>
  )
}

export default CartIcon;