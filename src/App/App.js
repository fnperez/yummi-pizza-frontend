import React from 'react';
import { connect } from 'react-redux';
import { authActions, cartActions } from '../_actions';
import { Alert } from '../_components/alert.component';
import Routes from '../routes';
import { Container } from 'semantic-ui-react';
import { isLoggedIn, hasCartId } from '../_helpers';

class App extends React.Component {
     componentDidMount = () => {
         if (isLoggedIn() && !this.props.loggedIn) {
            this.props.me();
         };

         if (hasCartId() && !this.props.synced) {
             this.props.syncCart();
         }
    }

    render = () => {
        return (
            <Container fluid>
                <Alert />

                <Routes />
            </Container>
        );
    }
}

function mapState(state) {
    const { currentUser, loggedIn } = state.auth
    return { currentUser, loggedIn };
}

const actionCreators = {
    me: authActions.me,
    logout: authActions.logout,
    syncCart: cartActions.sync
};

const connectedApp = connect(mapState, actionCreators)(App);

export { connectedApp as App };