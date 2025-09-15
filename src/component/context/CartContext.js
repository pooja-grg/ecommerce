import { createContext, useReducer, useContext, useEffect } from "react";

const CartContext = createContext();

const initialState = {
    cart: JSON.parse(localStorage.getItem('card')) || [],
}

const cartReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_ITEM': {
            //identify existing item
            const existingItem = state.cart.find(item => item.id === action.payload.id);
            let newCart;
            if(existingItem) {
                newCart = state.card.map(item => 
                    item.id === action.payload.id
                    ? {...item, quantity: item.quantity + 1}
                    : item
                );
            }else {
                newCart = {...state.cart, {...action.payload, quantity: 1}};
            }
            localStorage.setItem('cart', JSON.stringify(newCart));
            return {...state, cart:newCart};
        }
        case 'REMOVE_ITEM': {
            const newCart = state.card.filter(item=> item.id !== action.payload.id);
            localStorage.setItem('card', JSON.stringify(newCart));
            return {...state, cart:newCart};
        }

        case 'INCREMENT_ITEM': {
            const newCart = state.cart.map(item=>
                item.id === action.payload.id
                ? {...item, quantity: item.quantity}
            )
        }
    }
}