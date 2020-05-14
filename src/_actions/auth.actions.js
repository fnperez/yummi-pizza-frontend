import { authConstants } from '../_constants';
import { authService } from '../_services';

const login = (props) => {
    return dispatch => {
        dispatch(request())

        authService.authenticate(props.email, props.password)
            .then(token => dispatch(setToken(token)))
            .then(authService.me)
            .then(user => dispatch(setUser(user)))
            .catch(error => dispatch(failure(error)));
    };

    function request() { return { type: authConstants.LOGIN_REQUEST } }
    function setToken(token) { return { type: authConstants.LOGIN_SET_TOKEN, token } }
    function setUser(user) { return { type: authConstants.LOGIN_SET_USER, user } }
    function failure(error) { return { type: authConstants.LOGIN_FAILURE, error } }
}

const me = () => {
    return dispatch => {
        dispatch(request())

        authService.me()
            .then(user => {
                dispatch(setUser(user))
            })
            .catch(error => dispatch(failure(error)));
    };
    function request() { return { type: authConstants.ME_REQUEST } }
    function setUser(user) { return { type: authConstants.LOGIN_SET_USER, user } }
    function failure(error) { return { type: authConstants.LOGIN_FAILURE, error } }
}

const register = (props) => {
    return dispatch => {
        dispatch(request());

        authService.register(props)
            .then(token => dispatch(setToken(token)))
            .then(authActions.me)
            .catch(error => dispatch(failure(error)));
    };

    function request() { return { type: authConstants.REGISTER_REQUEST } }
    function setToken(token) { return { type: authConstants.LOGIN_SET_TOKEN, token } }
    function failure(error) { return { type: authConstants.REGISTER_FAILURE, error } }
}

const logout = () => {
    authService.logout();
    
    return { type: authConstants.LOGOUT };
}

export const authActions = {
    login,
    logout,
    me,
    register,
};