import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import authSlice from "./auth-slice";

const store: any = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    auth: authSlice.reducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
