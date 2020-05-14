import React from 'react';
import { history } from './_helpers';
import { PrivateRoute } from './_components';
import { LoginPage } from './LoginPage';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { CatalogPage } from './CatalogPage/CatalogPage';

const Routes = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path='/' component={ CatalogPage } />

                <PrivateRoute exact path="/account" component={ LoginPage } />
                
                <Redirect from="*" to="/" />
            </Switch>
        </Router>
    )
}

export default Routes;