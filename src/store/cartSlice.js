import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

// Helper function to calculate totals
const calculateTotals = (items) => {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { totalQuantity, totalAmount };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item to cart or increase quantity if it exists
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);

       if (existingItem) {
    // Add to existing quantity, but don't exceed stock
    const newQuantity = existingItem.quantity + (action.payload.quantity || 1);
    existingItem.quantity = Math.min(newQuantity, existingItem.stock);
  } else {
    // Add new item with quantity (default to 1 if not specified)
    state.items.push({ 
      ...action.payload, 
      quantity: action.payload.quantity || 1 
    });
  }

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
    },

    // Remove item from cart completely
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
    },

    // Update item quantity
    updateQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);

      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(item => item.id !== action.payload.id);
        } else if (action.payload.quantity <= item.stock) {
          item.quantity = action.payload.quantity;
        }
      }

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
    },

    // Clear entire cart
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => state.cart.totalAmount;
export const selectCartQuantity = (state) => state.cart.totalQuantity;
