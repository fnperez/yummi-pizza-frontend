import React from 'react';
import { connect } from 'react-redux';
import { authActions } from '../_actions';
import { Alert } from '../_components/alert.component';
import Routes from '../routes';
import { Container } from 'semantic-ui-react';
import { isLoggedIn } from '../_helpers';

class App extends React.Component {
     componentDidMount = () => {
         if (isLoggedIn() && !this.loggedIn) {
            this.props.me();
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
    logout: authActions.logout
};

const connectedApp = connect(mapState, actionCreators)(App);

export { connectedApp as App };