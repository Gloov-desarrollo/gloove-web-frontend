import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Crear el Contexto
export const CartContext = createContext();

// Hook personalizado para usar el contexto fácilmente
export const useCart = () => {
    return useContext(CartContext);
};

// 2. Crear el Proveedor del Contexto
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const localData = localStorage.getItem('cartItems');
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            console.error("Error parsing cart data from localStorage", error);
            return [];
        }
    });

    // Guardar en localStorage cada vez que el carrito cambie
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        // Lógica para evitar duplicados, por ahora simplemente añade
        setCartItems(prevItems => [...prevItems, { ...item, cartId: Date.now() }]); // Se añade un ID único para el carrito
    };

    const removeFromCart = (cartId) => {
        setCartItems(prevItems => prevItems.filter(item => item.cartId !== cartId));
    };

    const updateQuantity = (cartId, amount) => {
        setCartItems(prevItems => 
            prevItems.map(item => 
                item.cartId === cartId 
                ? { ...item, quantity: Math.max(1, item.quantity + amount) } 
                : item
            )
        );
    };

    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
