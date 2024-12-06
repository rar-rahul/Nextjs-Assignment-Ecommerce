import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishList: [],
};

const WishlistSlice = createSlice({
  name: "Wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const favItem = action.payload;
      // Check if the product is already in the wishlist
      const existingItem = state.wishList.find(
        (item) => item.id === favItem.id,
      );
      if (!existingItem) {
        state.wishList.push(favItem);
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishList = state.wishList.filter(
        (item) => item.id !== action.payload,
      );
    },
  },
});

export const { addToWishlist, removeFromWishlist } = WishlistSlice.actions;
export default WishlistSlice.reducer;
