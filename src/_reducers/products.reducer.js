import { productsConstants } from "../_constants";
import { idAsKey } from '../_helpers';

const initState = {
    items: [],
    loading: false,
};

export function products(state = initState, action) {
    switch(action.type) {
        case productsConstants.BROWSE_REQUEST:
            return {
                loading: true,
                items: []
            }
        case productsConstants.BROWSE_SUCCESS:
            return {
                loading: false,
                items: idAsKey(action.items)
            }
        case productsConstants.BROWSE_FAILURE:
            state.loading = false;

            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}