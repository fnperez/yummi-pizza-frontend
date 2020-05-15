import { checkResponse, authHeader } from '../_helpers';
import { User, AccessToken } from '../_models';

const authenticate = async (email, password) => {
    const body = new URLSearchParams();

    body.append('email', email);
    body.append('password', password);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body
    };

    return fetch(`${window.api.url}/auth/login`, requestOptions)
        .then(checkResponse)
        .then(response => {
            const token = AccessToken.fromJson(response.data);

            localStorage.setItem('accessToken', JSON.stringify(token));

            return token;
        })
};

const me = async () => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    return fetch(`${window.api.url}/auth/me`, requestOptions)
        .then(checkResponse)
        .then(response => {
            return User.fromJson(response.data)
        })
}

const register = async (props) => {
    const body = new URLSearchParams();

    body.append('email', props.email);
    body.append('password', props.password);
    body.append('name', props.name);
    body.append('password_confirmation', props.password_confirmation);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body
    };

    return fetch(`${window.api.url}/auth/register`, requestOptions)
        .then(checkResponse)
        .then(response => {
            const token = AccessToken.fromJson(response.data);

            localStorage.setItem('accessToken', JSON.stringify(token));

            return token;
        })
}

const logout = () => {
    localStorage.removeItem('accessToken');
}

export const authService = {
    authenticate,
    me,
    logout,
    register
};