import {
    ADD_PRODUCT_FOR_DELETE,
    CREATE_PRODUCT,
    DELETE_PRODUCT, HIDE_LOADING_PRODUCT_CREATOR,
    HIDE_LOADING_PRODUCTS_LOADER,
    LOADING_PRODUCTS, REMOVE_PRODUCT_FOR_DELETE, SHOW_LOADING_PRODUCT_CREATOR,
    SHOW_LOADING_PRODUCTS_LOADER
} from "./types";
import axios from "axios";


export function createProduct(newProduct) {
    return async dispatch => {
        axios
            .request({
                method: "POST",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                url: 'https://scandiwebtesttasknmaitukh.000webhostapp.com/back-end/?action=createProduct',
                data: newProduct,
            })
            .then(response => {
                dispatch({type: CREATE_PRODUCT, payload: newProduct});
                dispatch(loadingProducts());
            })
            .catch((reason) => {
                console.log(reason)
            })
    }
}

export function loadingProducts() {
    return async dispatch => {
        dispatch(showLoadingProductsLoader())
        axios
            .get('https://scandiwebtesttasknmaitukh.000webhostapp.com/back-end/?action=getProducts')
            .then(response => {
                dispatch({type: LOADING_PRODUCTS, payload: response.data});
                dispatch(hideLoadingProductsLoader())
            })
            .catch(() => {
                dispatch(showLoadingProductsLoader())
            })
    }
}

export function deleteProduct(products) {
    return async dispatch => {
        axios
            .request({
                method: "POST",
                url: `https://scandiwebtesttasknmaitukh.000webhostapp.com/back-end/?action=deleteProducts`,
                data: products,
            })
            .then((response) => {
                dispatch({type: DELETE_PRODUCT, payload: products})
                dispatch(loadingProducts());
            })
            .catch((reason) => {
                console.log(reason)
            });
    }
}

export function addProductForDelete(product) {
    return {
        type: ADD_PRODUCT_FOR_DELETE,
        payload: product,
    }
}

export function removeProductForDelete(product) {
    return {
        type: REMOVE_PRODUCT_FOR_DELETE,
        payload: product,
    }
}

export function showLoadingProductsLoader() {
    return {
        type: SHOW_LOADING_PRODUCTS_LOADER
    }
}

export function hideLoadingProductsLoader() {
    return {
        type: HIDE_LOADING_PRODUCTS_LOADER
    }
}

export function showLoadingProductCreator() {
    return {
        type: SHOW_LOADING_PRODUCT_CREATOR
    }
}

export function hideLoadingProductCreator() {
    return {
        type: HIDE_LOADING_PRODUCT_CREATOR
    }
}

