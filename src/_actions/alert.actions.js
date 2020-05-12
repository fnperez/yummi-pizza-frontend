import { alertConstants } from '../_constants';

const success = (props) => {
    return dispatch => {
        dispatch(request(props));
    };

    function request(props) { return { type: alertConstants.SHOW_SUCCESS, props } }
}

const warning = (props) => {
    return dispatch => {
        dispatch(request(props));
    };

    function request(props) { return { type: alertConstants.SHOW_WARNING, props } }
}

const error = (props) => {
    return dispatch => {
        dispatch(request(props));
    };

    function request(props) { return { type: alertConstants.SHOW_ERROR, props } }
}

const close = () => {
    return dispatch => {
        dispatch(request());
    };

    function request() { return { type: alertConstants.CLOSE } }
}   

export const alertActions = {
    success,
    warning,
    error,
    close
};