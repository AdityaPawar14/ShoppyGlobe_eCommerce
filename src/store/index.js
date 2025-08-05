import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// Configure Redux store
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
