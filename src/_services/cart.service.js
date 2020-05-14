import { setCartId, checkResponse } from "../_helpers";
import { Item } from "../_models";

const add = async (id, cartId) => {
    const body = new URLSearchParams();

    body.append('product_id', id);
    body.append('cart_id', cartId);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
    };

    return fetch(`${window.api.url}/cart_items`, requestOptions)
        .then(checkResponse)
        .then(response => Item.fromJson(response.data))
}

const fetchItems = async (cartId) => {
    const requestOptions = {
        method: 'GET',
    };

    return fetch(`${window.api.url}/carts/${cartId}`, requestOptions)
        .then(checkResponse)
        .then(response => {
            const cart = response.data;

            return cart.items.map(itemData => Item.fromJson(itemData));
        })
}

export const cartService = {
    add,
    fetchItems
};