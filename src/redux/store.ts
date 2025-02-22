import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slices/cartSlice'
import authSlice from './slices/authSlice'

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth: authSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store