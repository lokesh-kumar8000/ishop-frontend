import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cartSlice";
import userSlice from "./features/userSlice";

export default configureStore({
  reducer: {
    cart: cartSlice,
    user: userSlice,
  },
});
