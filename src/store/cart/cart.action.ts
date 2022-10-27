import { createAction, withMatcher,  ActionWithPayload} from "../../utils/reducer/reducer.utils";
import { CategoryItem } from "../catagories/category.types";
import { CartItem, CART_ACTION_TYPES } from "./cart.types";

const addCartItem = (cartItems : CartItem[], productToAdd: CategoryItem): CartItem[] => {
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

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem):  CartItem[] =>{
    // find the cart item to remove
    const existingCartItem = cartItems.find((item) => item.id === cartItemToRemove.id);

    // check if quantity equal to 1, if it is remove that item from cart
    if (existingCartItem && existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    // return back cart item with matching cart item with reduce quantity
    return cartItems.map(item => item.id === cartItemToRemove.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
}

const clearCartItem = (cartItems: CartItem[], cartItemToRemove : CartItem): CartItem[] => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
};

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>
export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems));

export const setIsCartOpen = withMatcher((bool: boolean): SetIsCartOpen => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    return setCartItems(newCartItems);
}

export const removeItemToCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove)
    return setCartItems(newCartItems);
}

export const clearItemToCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
    const newCartItems = clearCartItem(cartItems, cartItemToRemove)
    return setCartItems(newCartItems);
}


