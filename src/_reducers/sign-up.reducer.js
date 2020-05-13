import { authConstants } from "../_constants";

export function singUp (state = {}, action) {
    switch (action.type) {
        case authConstants.REGISTER_REQUEST:
        return { 
            registering: true 
        };
      case authConstants.REGISTER_FAILURE:
        return {
            error: action.error
        };
      default:
        return state
    }
}