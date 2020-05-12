import { userConstants } from '../_constants';
import { userService } from '../_services';
import { history, logout as authLogout } from '../_helpers';

const login = (username, password) => {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

const logout = () => {
    authLogout();
    
    return { type: userConstants.LOGOUT };
}

export const userActions = {
    login,
    logout,
};