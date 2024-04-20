import { createAsyncThunk } from "@reduxjs/toolkit";
import { CartState } from "./cart-slice";



export const updateCartData = createAsyncThunk(
  "cart/updateCartData",
  async (cart: CartState, { rejectWithValue }) => {
    try {
      const dataString = localStorage.getItem("userData");
      let userId = "";
      if (dataString) {
        const { data } = JSON.parse(dataString);
        userId = data._id;
      } else {
        throw new Error("Authenticated user can only add items to cart");
      }
      const response = await fetch(`http://localhost:3000/api/v1/cart/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        throw new Error("Failed to send cart data to the server");
      }


      const data = await response.json();
      if (!data.cart || !data.cart.items) {
        throw new Error("Cart items not found in response");
      }
      const transformedData: CartState = {
        items: data.cart.items.map((item: any) => ({
          itemId: item.product._id,
          name: item.product.name,
          image: item.product.images ? item.product.images[0] : "",
          price: item.product.price,
          quantity: item.product.quantity,
          totalPrice: item.product.quantity * item.product.price,
        })),
        totalQuantity: data.cart.items.reduce((sum: number, item: any) => sum + item.product.quantity, 0),
        billAmount: data.cart.items.reduce((sum: number, item: any) => sum + item.product.quantity * item.product.price, 0),
        changed: true
      };
      console.log(transformedData);
      return transformedData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCartData = createAsyncThunk(
  "cart/fetchCartData",
  async (_, { rejectWithValue }) => {
    try {
      const dataString = localStorage.getItem("userData");
      let userId = "";
      if (dataString) {
        const { data } = JSON.parse(dataString);
        userId = data._id;
      }
      const response = await fetch(`http://localhost:3000/api/v1/cart/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch items from the cart on the server");
      }
      const data = await response.json();
      if (!data.cart || !data.cart.items) {
        throw new Error("Cart items not found in response");
      }
      const transformedData: CartState = {
        items: data.cart.items.map((item: any) => ({
          itemId: item.product._id,
          name: item.product.name,
          image: item.product.images ? item.product.images[0] : "",
          price: item.product.price,
          quantity: item.product.quantity,
          totalPrice: item.product.quantity * item.product.price,
        })),
        totalQuantity: data.cart.items.reduce((sum: number, item: any) => sum + item.product.quantity, 0),
        billAmount: data.cart.items.reduce((sum: number, item: any) => sum + item.product.quantity * item.product.price, 0),
        changed: true
      };
      console.log(transformedData);
      return transformedData;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
