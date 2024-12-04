import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    cart:[],
    products:[],
    status: 'idle',
}

//Thunk Function to fetch data with async
export const fetchProducts = createAsyncThunk('ProductSlice/fetchAllProducts',
    async () => {
        const data = await axios.get('https://dummyjson.com/products');
        return data.data.products
})

const ProductSlice = createSlice({
    name:'ProductSlice',
    initialState,
    reducers:{
        addToCart:(state,action) => {

            return {...state,
                cart:[...state.cart,action.payload]}
        },
        removeCart:() =>{

        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchProducts.pending,(state) => {
            state.status = 'loading'
        })
        .addCase(fetchProducts.fulfilled,(state,action) => {
          //  state.products.push(action.payload)
            state.products = action.payload
            state.status = 'success'
        })
        .addCase(fetchProducts.rejected,(state) => {
            state.status = 'failed'
        })
    }
})

export const {addToCart,removeCart} = ProductSlice.actions
export default ProductSlice.reducer