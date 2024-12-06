import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cart: [],
  products: [],
  status: "idle",
  searchQuery: "",
};

//Thunk Function to fetch data with async
export const fetchProducts = createAsyncThunk(
  "ProductSlice/fetchAllProducts",
  async () => {
    const data = await axios.get("https://dummyjson.com/products");
    return data.data.products;
  },
);

const ProductSlice = createSlice({
  name: "ProductSlice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      //check item already exist in cart
      // const existingItemIndex = state.cart.findIndex((cartItem) => cartItem.id === action.payload.id);

      // if (existingItemIndex >= 0) {
      //     // Item already exists in the cart, so we update its quantity
      //     state.cart[existingItemIndex].qty += action.payload.qty; // Directly mutate the draft
      //   } else{

      //     return {...state,
      //         cart:[...state.cart,action.payload]}

      //   }

      const product = action.payload;
      const existProduct = state.cart.find((item) => item.id === product.id);
      if (existProduct) {
        existProduct.qty += product.qty;
      } else {
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      }
    },
    removeCart: (state, action) => {
      const newcart = state.cart.filter((item) => item.id !== action.payload);

      return {
        ...state,
        cart: newcart,
      };
    },
    searchKeyword: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        //  state.products.push(action.payload)
        state.products = action.payload;
        state.status = "success";
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addToCart, removeCart, searchKeyword } = ProductSlice.actions;
export default ProductSlice.reducer;
