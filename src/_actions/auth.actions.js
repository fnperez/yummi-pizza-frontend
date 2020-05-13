import { authConstants } from '../_constants';
import { authService } from '../_services';
import { history } from '../_helpers';

const login = (props) => {
    return dispatch => {
        dispatch(request());

        authService.authenticate(props.username, props.password)
            .then(token => dispatch(setToken(token)))
            .then(authActions.me)
            .then(() => history.push('/'))
            .catch(error => dispatch(failure(error)));
    };

    function request() { return { type: authConstants.LOGIN_REQUEST } }
    function setToken(token) { return { type: authConstants.LOGIN_SET_TOKEN, token } }
    function failure(error) { return { type: authConstants.LOGIN_FAILURE, error } }
}

const me = () => {
    return dispatch => {
        authService.me()
            .then(user => {
                dispatch(setUser(user))
            })
            .catch(() => {});
    };

    function setUser(user) { return { type: authConstants.LOGIN_SET_USER, user } }
}

const register = (props) => {
    return dispatch => {
        dispatch(request());

        authService.register(props)
            .then(token => dispatch(setToken(token)))
            .then(authActions.me)
            .then(() => history.push('/'))
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