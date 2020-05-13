import { cartConstants } from "../_constants/cart.constants";

const initState = {
    addedItems: [],
    total: 0,
    loading: false,
    currency: 'usd',
    currencies: window.currencies
}

export function cart(state = initState, action) {
    switch(action.type) {
        case cartConstants.SWITCH_CURRENCY: {
            state.currency = action.currency;

            return {
                ...state
            }; 
        }
        default:
            return state;
    }
}