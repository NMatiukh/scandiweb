import {
    HIDE_LOADING_PRODUCT_CREATOR,
    HIDE_LOADING_PRODUCTS_LOADER,
    SHOW_LOADING_PRODUCT_CREATOR,
    SHOW_LOADING_PRODUCTS_LOADER
} from "../types";


const initialState = {
    loadingProductsLoader: false,
    loadingProductCreator: false
}
export const loaderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_LOADING_PRODUCTS_LOADER:
            return {...state, loadingProductsLoader: true}
        case HIDE_LOADING_PRODUCTS_LOADER:
            return {...state, loadingProductsLoader: false}
        case SHOW_LOADING_PRODUCT_CREATOR:
            return {...state, loadingProductCreator: true}
        case HIDE_LOADING_PRODUCT_CREATOR:
            return {...state, loadingProductCreator: false}
        default:
            return state
    }
}