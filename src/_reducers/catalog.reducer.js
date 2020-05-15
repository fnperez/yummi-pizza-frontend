import { combineReducers } from "redux";
import { products } from './products.reducer';
import { cart } from './cart.reducer';
import { address } from './address.reducer';

export const catalog = combineReducers({
    products,
    cart,
    address,
})