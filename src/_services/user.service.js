import { checkResponse } from '../_helpers';
import User from '../_models/user.model';

const login = async (email, password) => {
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
            return me(response.data);
        })
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        })
};

const me = async (data) => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Authorization': data.token_type + ' ' + data.token },
    };

    return fetch(`${process.env.REACT_APP_SERVER_API}/auth/me`, requestOptions)
        .then(checkResponse)
        .then(userData => {
            const user = new User();

            user.id = userData.id;
            user.name = userData.name;
            user.email = userData.email;
            user.createdAt = userData.created_at;
            user.updatedAt = userData.updated_at;
            user.accessToken = data.token;
            user.tokenType = data.token_type;

            return user;
        })
}

export const userService = {
    login,
};