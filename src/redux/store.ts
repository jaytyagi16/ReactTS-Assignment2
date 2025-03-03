import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slices/cartSlice'
import authSlice from './slices/authSlice'
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from 'redux-persist'

const persistConfig = {
  key: "auth",
  storage
}

const persistedAuthReducer = persistReducer(persistConfig, authSlice)

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth: persistedAuthReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
export const persistor = persistStore(store);