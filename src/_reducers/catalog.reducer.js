import { combineReducers } from "redux";
import { products } from './products.reducer';
import { cart } from './cart.reducer';

export const catalog = combineReducers({
    products,
    cart
})