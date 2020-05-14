import { cartConstants } from "../_constants/cart.constants";
import { idAsKey } from '../_helpers';

const calculateTotal = (items) => {
    return items.map(item => item.quantity).reduce((prev, curr) => prev + curr);
}

const addItem = (state, item) => {
    state.addedItems[item.id] = item;
    state.total++;
    state.addingItems[item.id] = false;

    return state;
}

const initState = {
    addedItems: [],
    total: 0,
    currency: 'usd',
    currencies: window.currencies,
    addingItems: [],
}

export function cart(state = initState, action) {
    switch(action.type) {
        case cartConstants.SWITCH_CURRENCY: 
            state.currency = action.currency;

            return {
                ...state   
            }; 

        case cartConstants.SYNC_REQUEST:
            return {
                ...state,
                syncing: true,
            };
        case cartConstants.SYNC_SUCCESS:
            state.synced = true;
            state.total = calculateTotal(action.items);
            state.addedItems = idAsKey(action.items);
            state.syncing = false;
            
            return {
                ...state,
                synced: true
            }
        case cartConstants.SYNC_FAILURE:
            state.syncing = false;

            return {
                ...state,
            }
        case cartConstants.ADD_REQUEST:
            state.addingItems[action.id] = true;

            return {
                ...state,
                syncing: true,
            }
        case cartConstants.ADD_SUCCESS:
            let newState = addItem(state, action.item);
            newState.syncing = false;

            return {
                ...newState,
            }
        case cartConstants.ADD_FAILURE:
            state.syncing = false;
            state.addingItems[action.id] = false;

            return {
                ...state,
                error: action.error,
            }
        default:
            return state;
    }
}