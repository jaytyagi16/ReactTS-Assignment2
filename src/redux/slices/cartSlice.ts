import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Product} from "../../types/Product"

interface CartInitialState {
    carts: {
        [userEmail: string]: Product[]
    }
}

const initialState: CartInitialState = {
    carts: {}
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartItem: (state, action: PayloadAction<{userEmail: string; cartItems: Product[]}>) => {
            state.carts[action.payload.userEmail] = action.payload.cartItems;
        }
    }
})

export const { setCartItem } = cartSlice.actions;
export default cartSlice.reducer;