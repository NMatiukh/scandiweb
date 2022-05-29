import {
    ADD_PRODUCT_FOR_DELETE,
    CREATE_PRODUCT,
    DELETE_PRODUCT,
    LOADING_PRODUCTS, REMOVE_PRODUCT_FOR_DELETE
} from "../types";

const initialState = {
    allProducts: [],
    productsForDelete: [],
}

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PRODUCT:
            return state
        case LOADING_PRODUCTS:
            return {...state, allProducts: action.payload}
        case DELETE_PRODUCT:
            return state
        case ADD_PRODUCT_FOR_DELETE:
            return {...state, productsForDelete: [...state.productsForDelete, action.payload]}
        case REMOVE_PRODUCT_FOR_DELETE:
            return {...state, productsForDelete: state.productsForDelete.filter(product => product.sku !== action.payload.sku)}
        default:
            return state
    }
}