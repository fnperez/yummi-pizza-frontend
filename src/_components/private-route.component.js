import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../_helpers';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isLogin()
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)