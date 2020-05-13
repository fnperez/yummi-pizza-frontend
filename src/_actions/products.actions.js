import { productsConstants } from "../_constants"
import { productsService } from "../_services";

const browse = () => {
	return dispatch => {
		dispatch(request());

		productsService.browse()
			.then(items => dispatch(success(items)))
			.catch(error => dispatch(failure(error)));
	}

	function request() { return { type: productsConstants.BROWSE_REQUEST } }
	function success(items) { return { type: productsConstants.BROWSE_SUCCESS, items } }
	function failure(errors) { return { type: productsConstants.BROWSE_FAILURE, errors } }
}

export const productsActions = {
	browse
}