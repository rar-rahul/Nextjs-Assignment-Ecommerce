import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "../reducer/ProductSlice";
import WishlistSlice from "../reducer/WishlistSlice";

export const store = configureStore({
  reducer: {
    products: ProductSlice,
    wishlist: WishlistSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>; // Automatically infers the full state structure
export type AppDispatch = typeof store.dispatch;
