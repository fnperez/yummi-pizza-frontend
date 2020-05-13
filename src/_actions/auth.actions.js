import { authConstants } from '../_constants';
import { authService } from '../_services';
import { history } from '../_helpers';

const login = (username, password) => {
    return dispatch => {
        dispatch(request());

        authService.authenticate(username, password)
            .then(token => dispatch(setToken(token)))
            .then(userActions.me)
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

const logout = () => {
    authService.logout();
    
    return { type: authConstants.LOGOUT };
}

export const userActions = {
    login,
    logout,
    me,
};