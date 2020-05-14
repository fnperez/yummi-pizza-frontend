import { cartConstants } from "../_constants/cart.constants";
import { cartService } from "../_services";
import { getCartId, setCartId, checkStatus } from "../_helpers";

const switchCurrency = (currency = 'usd') => {
    return {
        type: cartConstants.SWITCH_CURRENCY,
        currency
    }
}

const add = (id) => {
    return dispatch => {
        dispatch(request(id));

        cartService.add(id, getCartId())
            .then(item => {
                setCartId(item.cartId)

                return item;
            })
            .then(item => dispatch(success(item)))
            .catch(error => {
                checkStatus(error)
                dispatch(failure(error, id))
            });
    };

    function request(id) { return { type: cartConstants.ADD_REQUEST, id } }
    function success(item) { return { type: cartConstants.ADD_SUCCESS, item } }
    function failure(error) { return { type: cartConstants.ADD_FAILURE, error, id } }
}

const sync = () => {
    return dispatch => {
        dispatch(request());

        cartService.fetchItems(getCartId())
            .then(items => dispatch(success(items)))
            .catch(error => {
                checkStatus(error)
                dispatch(failure(error))
            });
    }

    function request() { return { type: cartConstants.SYNC_REQUEST } }
    function success(items) { return { type: cartConstants.SYNC_SUCCESS, items } }
    function failure(error) { return { type: cartConstants.SYNC_FAILURE, error } }
}

const remove = (id) => {
    return dispatch => {
        dispatch(request(id));

        cartService.remove(id, getCartId())
            .then(() => dispatch(success(id)))
            .catch(error => {
                checkStatus(error)
                dispatch(failure(error))
            });
    }

    function request(id) { return { type: cartConstants.REMOVE_REQUEST, id } }
    function success() { return { type: cartConstants.REMOVE_SUCCESS, id } }
    function failure(error) { return { type: cartConstants.REMOVE_FAILURE, error } }
}

export const cartActions = {
    switchCurrency,
    add,
    sync,
    remove,
};