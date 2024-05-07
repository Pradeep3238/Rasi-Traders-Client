import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ProductsPage from "./pages/ProductsPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import OrdersPage from "./pages/OrdersPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";

import CommonLayout from "./pages/CommonLayout.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.tsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCartData, updateCartData } from "./store/cart-actions.ts";
import {  CartStateType } from "./store/cart-slice.ts";
import PlaceOrder from "./pages/PlaceOrder.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <CommonLayout />,
    children: [
      { path: "/", element: <DashboardPage /> },
      { path: "/products", element: <ProductsPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/orders", element: <OrdersPage /> },
      { path: "/products/:id", element: <ProductDetailsPage /> },
      { path: "/placeOrder", element:<PlaceOrder/>}
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
]);


let isInitial = true;

const App = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: CartStateType) => state.cart);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
     if (cart.changed) 
      dispatch(updateCartData(cart));
  
  }, [cart, dispatch]);
  
  return <RouterProvider router={router} />;
};

export default App;
