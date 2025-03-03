import { combineReducers, configureStore } from '@reduxjs/toolkit'
import cartSlice from './slices/cartSlice'
import authSlice from './slices/authSlice'
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from 'redux-persist'

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart"],
}

const rootReducer = combineReducers({
  auth: authSlice,
  cart: cartSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Needed for redux-persist
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
export const persistor = persistStore(store);