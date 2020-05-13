import React from 'react';
import { history, isLoggedIn } from './_helpers';
import { PrivateRoute } from './_components';
import { SignUpPage } from './SingUpPage';
import { LoginPage } from './LoginPage';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import CatalogPage from './CatalogPage/CatalogPage';
import { PublicRoute } from './_components/public-route.component';

const Routes = () => {
    return (
        <Router history={history}>
            <Switch>
                <PublicRoute exact path="/login" restricted={ isLoggedIn() } component={ LoginPage }  />
                <PublicRoute exact path='/sign-up' restricted={ isLoggedIn() } component={ SignUpPage } />

                <Route exact path='/' component={ CatalogPage } />

                <PrivateRoute exact path="/account" component={ LoginPage } />
                
                <Redirect from="*" to="/" />
            </Switch>
        </Router>
    )
}

export default Routes;