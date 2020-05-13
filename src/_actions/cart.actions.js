import { cartConstants } from "../_constants/cart.constants";

const switchCurrency = (currency = 'usd') => {
    return {
        type: cartConstants.SWITCH_CURRENCY,
        currency
    }
}

export const cartActions = {
    switchCurrency
};