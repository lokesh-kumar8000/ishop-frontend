import { notify } from "@/library/helper";
import { createSlice, current } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    final_total: 0,
    original_total: 0,
  },
  reducers: {
    addToCart: (state, { payload }) => {
      const { productId, originalPrice, finalPrice } = payload;
      // console.log(payload, "payload");
      const existingItem = state.items.find(
        (item) => item.productId == productId
      );
      if (existingItem) {
        existingItem.qty++;
      } else {
        state.items.push({ productId: productId, qty: 1 });
      }
      state.final_total += finalPrice;
      state.original_total += originalPrice;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    lstoCart: (state) => {
      const cart = JSON.parse(localStorage.getItem("cart"));
      if (cart) {
        state.items = cart.items;
        state.final_total = cart.final_total;
        state.original_total = cart.original_total;
      }
    },
    removeCart: (state, { payload }) => {
      const { productId, originalPrice, finalPrice } = payload;
      state.items = state.items.filter((item) => item.productId !== productId);
      state.final_total -= finalPrice * payload.qty;
      state.original_total -= originalPrice * payload.qty;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    clearCart: (state) => {
      state.items = [];
      state.final_total = 0;
      state.original_total = 0;
      localStorage.removeItem("cart");
    },

    incDec: (state, { payload }) => {
      const { flag, productId, original_total, final_total } = payload;
      const existingItem = state.items.find(
        (item) => item.productId == productId
      );
      if (existingItem) {
        if (flag == "+") {
          existingItem.qty++;
          state.final_total += final_total;
          state.original_total += original_total;
        } else if (flag == "-") {
          if (existingItem.qty > 1) {
            existingItem.qty--;
            state.final_total -= final_total;
            state.original_total -= original_total;
          } else {
            notify("Minimum quantity is 1", true);
          }
        }
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart, lstoCart, removeCart, incDec, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
