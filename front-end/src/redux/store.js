import {configureStore} from "@reduxjs/toolkit";
import {productReducer} from "./reducers/productReducer";
import {loaderReducer} from "./reducers/loaderReducer";

export default configureStore({
    reducer: {
        products: productReducer,
        load: loaderReducer
    }
});