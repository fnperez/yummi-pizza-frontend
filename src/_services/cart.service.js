import { checkResponse, authHeader } from "../_helpers";
import { Item, Invoice } from "../_models";

const add = async (id, cartId) => {
    const body = new URLSearchParams();

    body.append('product_id', id);
    cartId && body.append('cart_id', cartId);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
    };

    return fetch(`${process.env.API_URL}/cart_items`, requestOptions)
        .then(checkResponse)
        .then(response => Item.fromJson(response.data))
}

const fetchItems = async (cartId) => {
    const requestOptions = {
        method: 'GET',
    };

    return fetch(`${process.env.API_URL}/carts/${cartId}`, requestOptions)
        .then(checkResponse)
        .then(response => {
            const cart = response.data;

            return cart.items.map(itemData => Item.fromJson(itemData));
        })
}

const remove = async (id, cartId) => {
    const body = new URLSearchParams();

    body.append('product_id', id);
    body.append('cart_id', cartId);

    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
    };

    return fetch(`${process.env.API_URL}/cart_items`, requestOptions)
        .then(checkResponse);
}

const createInvoice = async (addressId, cartId) => {
    const body = new URLSearchParams();

    body.append('address_id', addressId);
    body.append('cart_id', cartId);

    const requestOptions = {
        method: 'POST',
        headers: Object.assign({ 'Content-Type': 'application/x-www-form-urlencoded' }, authHeader()),
        body
    };

    return fetch(`${process.env.API_URL}/invoices`, requestOptions)
        .then(checkResponse)
        .then(response => Invoice.fromJson(response.data));
}

const pay = async (invoiceId) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    return fetch(`${process.env.API_URL}/invoices/${invoiceId}/pay`, requestOptions)
        .then(checkResponse)
}

export const cartService = {
    add,
    fetchItems,
    remove,
    createInvoice,
    pay
};