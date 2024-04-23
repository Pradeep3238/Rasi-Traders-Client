import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { fetchCartData } from "./cart-actions";

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
    setCartData(state, action) {
      const { items, totalQuantity, billAmount } = action.payload;
      state.items = items;
      state.totalQuantity = totalQuantity;
      state.billAmount = billAmount;
    },
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
      const existingItem = state.items.find(
        (item) => item.itemId === id
      );
      if (!existingItem) {
        return
      }
        state.totalQuantity--;
        state.billAmount -= existingItem.price;

        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.itemId !== id);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
        }
    },
  },
});



export const cartActions: any = cartSlice.actions;

export type { CartStateType, CartItem };

export default cartSlice;
