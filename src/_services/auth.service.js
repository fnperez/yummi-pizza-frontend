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

    return fetch(`${process.env.REACT_APP_SERVER_API}/auth/login`, requestOptions)
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

    return fetch(`${process.env.REACT_APP_SERVER_API}/auth/me`, requestOptions)
        .then(checkResponse)
        .then(response => {
            return User.fromJson(response.data)
        })
}

const logout = () => {
    localStorage.removeItem('accessToken');
}

export const authService = {
    authenticate,
    me,
    logout,
};