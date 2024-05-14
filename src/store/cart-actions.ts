import { message } from "antd";
import { CartState, cartActions } from "./cart-slice";
import { AppThunk } from ".";



export const updateCartData = (cart: CartState):AppThunk =>{
      const dataString = localStorage.getItem("userData");
      let userId = "";
      if (dataString) {
        const { data } = JSON.parse(dataString);
        userId = data._id;
      } else {
    message.error('Login or signup to add items to cart')
      }
      const{items, totalQuantity, billAmount} = cart
      return async () =>{
        const sendRequest =   async () =>{
          
                const response = await fetch(`${import.meta.env.VITE_API_URL}/cart/${userId}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    items,
                    totalQuantity,
                    billAmount
                  }),
                });
          
                if (!response.ok) {
                  throw new Error("Failed to send cart data to the server");
                }
        }
        try{
          await sendRequest();
        }catch(err){
          console.log(err);
        }
      }
}

export const fetchCartData = ():AppThunk =>{
  const dataString = localStorage.getItem("userData");
  let userId = "";
  if (dataString) {
    const { data } = JSON.parse(dataString);
    userId = data._id;
  }
 
  return async (dispatch:any) => {
    const fetchData = async () =>{
      const response = await fetch(`${import.meta.env.VITE_API_URL}/cart/${userId}`, {
         method: "GET",
         headers: {
           "Content-Type": "application/json",
         },
       });
 
       if (!response.ok) {
         throw new Error("Failed to fetch items from the cart on the server");
       }
       const data = await response.json();
       return data;
      }
      
      try {
        const cartData = await fetchData();
        const {cart} = cartData
        console.log(cart)
        dispatch(cartActions.setCartData({
          items: cart.items.map((item: any) => ({
            itemId: item.product._id,
            name: item.product.name,
            image: item.product.images ? item.product.images[0] : "",
            price: item.product.price,
            quantity: item.quantity,
            totalPrice: item.quantity * item.product.price
          })),
          totalQuantity: cart.totalQuantity,
          billAmount: cart.billAmount
        }));
    } catch (err: any) {
      console.log(err)
    }
  }
}

