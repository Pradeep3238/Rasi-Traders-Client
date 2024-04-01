import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
const store: any = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export default store;
