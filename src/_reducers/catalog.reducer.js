import { combineReducers } from "redux";
import { products } from './products.reducer';

export const catalog = combineReducers({
    products,
})