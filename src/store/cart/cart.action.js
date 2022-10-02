import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

const addCartItem = (cartItems, productToAdd) => {
    // find if cart items contains productToAdd
    const existingCartItem = cartItems.find((item) => item.id === productToAdd.id);
    // if found increment quantity
    if (existingCartItem) {
        return cartItems.map(item => item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
    }

    // return new array with modified cartItems
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find((item) => item.id === cartItemToRemove.id);

    // check if quantity equal to 1, if it is remove that item from cart
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    // return back cart item with matching cart item with reduce quantity
    return cartItems.map(item => item.id === cartItemToRemove.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
}

const clearCartItem = (cartItems, cartItemToRemove) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
};

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const removeItemToCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const clearItemToCart = (cartItems, cartItemToRemove) => {
    const newCartItems = clearCartItem(cartItems, cartItemToRemove)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const setIsCartOpen = (bool) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);

