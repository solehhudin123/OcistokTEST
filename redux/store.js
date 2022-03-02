import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./reducer/ProductSlice";
export default configureStore({
    reducer:{
        product: ProductSlice
    },
});