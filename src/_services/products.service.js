import { Product } from "../_models";
import { checkResponse } from "../_helpers";

const browse = async () => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    };

    return fetch(`${process.env.API_URL}/products`, requestOptions)
        .then(checkResponse)
        .then(response => {
            const productsData = response.data;

            return productsData.map(Product.fromJson)
        })
}

export const productsService = {
    browse
}