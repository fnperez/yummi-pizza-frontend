import { cartConstants } from "../_constants/cart.constants";
import { idAsKey } from '../_helpers';
import { Price } from "../_models";
import { addressConstants } from "../_constants";

const calculateTotal = (items) => {
    const values = Object.values(items);

    return values.length
        ? Object.values(items).map(item => item.quantity).reduce((prev, curr) => prev + curr)
        : 0;
}

const calculateTotalPrice = (items) => {
    const values = Object.values(items);
    const totalPrice = Price.initValue();

    if (! values.length) return totalPrice;

    values.forEach(item => {
        totalPrice.add(item.totalPrice);
    });

    return totalPrice;
}

const addItem = (state, item) => {
    state.addedItems[item.id] = item;
    state.total = calculateTotal(state.addedItems);
    state.totalPrice.add(item.price);
    delete state.addingItems[item.id];

    return state;
}

const removeItem = (state, id) => {
    delete state.addedItems[id];
    state.total = calculateTotal(state.addedItems);
    state.totalPrice = calculateTotalPrice(state.addedItems);

    return state;
}

const resetState = () => {
    return {
        addedItems: {},
        total: 0,
        totalPrice: Price.initValue(),
        currency: 'usd',
        currencies: window.currencies,
        addingItems: {},
        step: cartConstants.CART_VIEW_STEP,
    };    
}

export function cart(state = resetState(), action) {
    switch(action.type) {
        case cartConstants.NEXT_STEP: {
            state.step = action.step;
            
            return {
                ...state
            }
        }
        case addressConstants.ADD_SUCCESS: {
            state.step = cartConstants.PAYMENT_STEP;
            state.totalPrice.add(action.address.deliveryCost);
            
            return {
                ...state
            }
        }
        case cartConstants.SWITCH_CURRENCY: {
            state.currency = action.currency;

            return {
                ...state   
            }; 
        }
        case cartConstants.SYNC_REQUEST: {
            return {
                ...state,
                syncing: true,
            };
        }
        case cartConstants.SYNC_SUCCESS: { 
            state.synced = true;
            state.total = calculateTotal(action.items);
            state.totalPrice = calculateTotalPrice(action.items);
            state.addedItems = idAsKey(action.items);
            state.syncing = false;
            
            return {
                ...state,
                synced: true
            }
        }
        case cartConstants.SYNC_FAILURE: {
            state.syncing = false;

            return {
                ...state,
            }
        }   
        case cartConstants.ADD_REQUEST: {
            state.addingItems[action.id] = true;

            return {
                ...state,
                syncing: true,
            }
        }
        case cartConstants.ADD_SUCCESS: {
            let newState = addItem(state, action.item);
            newState.syncing = false;

            return {
                ...newState,
            }
        }
        case cartConstants.ADD_FAILURE: {
            state.syncing = false;
            state.addingItems[action.id] = false;

            return {
                ...state,
                error: action.error,
            }
        }
        case cartConstants.REMOVE_REQUEST: {
            state.syncing = true;

            return {
                ...state,
            };
        }
        case cartConstants.REMOVE_SUCCESS: {
            let newState = removeItem(state, action.id);
            newState.syncing = false;

            return {
                ...newState
            };    
        }
        case cartConstants.REMOVE_FAILURE: {
            return {
                ...state,
                error: action.error,
            };
        }
        case cartConstants.PAY_REQUEST: {
            return {
                ...state,
                paying: true
            }
        }
        case cartConstants.PAY_SUCCESS: {
            let newState = resetState();
            newState.step = cartConstants.THANKS_STEP;

            return {
                ...newState
            }
        }
        case cartConstants.PAY_FAILURE: {
            return {
                ...state,
                error: action.error
            }
        }
        default:
            return state;
    }
}