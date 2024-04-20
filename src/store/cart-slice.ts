import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchCartData } from "./cart-actions";

interface CartItem {
  itemId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  billAmount: number;
  changed:boolean
}

interface CartStateType {
  cart: CartState;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  billAmount: 0,
  changed:false
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.itemId === newItem.itemId
      );
      state.changed=true
      state.totalQuantity += 1;
      state.billAmount += newItem.price;
      if (!existingItem) {
        state.items.push({
          itemId: newItem.itemId,
          image: newItem.image,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name,
        });
      } else {
        existingItem.quantity += 1;
        existingItem.totalPrice += newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      state.changed=true
      const existingItemIndex = state.items.findIndex(
        (item) => item.itemId === id
      );
      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];
        state.totalQuantity--;
        state.billAmount -= existingItem.price;

        if (existingItem.quantity === 1) {
          state.items.splice(existingItemIndex, 1);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
        }
      }
    },
    setCartData(state, action) {
      const { items, totalQuantity, billAmount , changed} = action.payload;
      state.items = items;
      state.totalQuantity = totalQuantity;
      state.billAmount = billAmount;
      state.changed = changed
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchCartData.fulfilled, (state, action) => {
      const cartData = action.payload;
      state.items = cartData.items;
      state.totalQuantity = cartData.totalQuantity;
      state.billAmount = cartData.billAmount;
      state.changed = cartData.changed;
    });
  },
});



export const cartActions: any = cartSlice.actions;

export type { CartStateType, CartItem };

export default cartSlice;
