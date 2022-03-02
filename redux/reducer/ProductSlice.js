import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk('products/getProducts', async () => {
    return await fetch('https://dev.ocistok.co.id/test-fe', {
        method:'GET',
        headers:{
            'Content-Type' : 'Application/json'
        }
    }).then((res) => res.json())
})
const productSlice = createSlice({
    name: 'product',
    initialState: {
        listProduct: [],
        status: null,
    },
    extraReducers: {
        [getProducts.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getProducts.fulfilled]: (state,{payload}) => {
            state.listProduct = payload
            state.status = 'success'
        },
        [getProducts.rejected]: (state,action) => {
            state.status = 'failed'
        }
    }
})
export default productSlice.reducer