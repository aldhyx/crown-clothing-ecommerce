import { useState, createContext, useEffect } from 'react';
import SHOP_DATA from '../shop-data.js';
import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils.js';

export const ProductsContext = createContext({
    products: [],
});

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const value = { products };

    // NOTE: create categories collection in firestore once
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []);

    return (
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    )
}