import { addressConstants } from "../_constants";
import { addressService } from "../_services";

const add = (props) => {
    return dispatch => {
        dispatch(request());

        addressService.add(props)
            .then(address => dispatch(success(address)))
            .catch(error => dispatch(failure(error)));
    };

    function request() { return { type: addressConstants.ADD_REQUEST  } }
    function success(address) { return { type: addressConstants.ADD_SUCCESS, address } }
    function failure(error) { return { type: addressConstants.ADD_FAILURE, error } }
}

export const addressActions = {
    add
};