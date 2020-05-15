import { addressConstants } from "../_constants";

export function address(state = {}, action) {
    switch(action.type) {
        case addressConstants.ADD_REQUEST:
            return {
                loading: true
            }
        case addressConstants.ADD_SUCCESS:
            return {
                address: action.address,
            }
        case addressConstants.ADD_FAILURE:
            return {
                error: action.error
            }
        default:
            return state;
    }
}