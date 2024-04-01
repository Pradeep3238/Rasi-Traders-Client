import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface CartItem {
    itemId: string;
    name: string;
    image: string,
    price: string;
    quantity: number;
    totalPrice: number;
}

interface CartState {
    items: CartItem[];
    totalQuantity: number;
    billAmount:number;
}

interface RootState {
    cart: CartState;
  }


const cartSlice = createSlice({
    name: "cart",
    initialState:{
        items:[],
        totalQuantity:0,
        billAmount:0
    } as CartState,
    reducers:{
        addItemToCart(state,action : PayloadAction<CartItem>){
            const newItem = action.payload;
            console.log(newItem)
            const existingItem = state.items.find(item => item.itemId === newItem.itemId);
            state.totalQuantity+=1;
            state.billAmount+= parseInt(newItem.price)
            if(!existingItem){
                state.items.push({
                    itemId: newItem.itemId,
                    image: newItem.image,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: parseInt(newItem.price),
                    name: newItem.name,
                });
            }else{
                existingItem.quantity +=1;
                existingItem.totalPrice += parseInt(newItem.price);
            }
        },
        removeItemFromCart(state, action) {
            const id = action.payload;
            const existingItemIndex = state.items.findIndex(item => item.itemId === id);
            if (existingItemIndex !== -1) { 
                const existingItem = state.items[existingItemIndex];
                state.totalQuantity--;
                state.billAmount-=parseInt(existingItem.price)
        
                if (existingItem.quantity === 1) {
                    state.items.splice(existingItemIndex, 1);
                } else {
                    existingItem.quantity--;
                    existingItem.totalPrice -= parseInt(existingItem.price);
                }
            }
        },
        
    }
})



export const cartActions:any = cartSlice.actions
export type { RootState, CartItem};
export default cartSlice;