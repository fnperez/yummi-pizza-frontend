import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { Alert } from '../_components/alert.component';
import Routes from '../routes';

class App extends React.Component {
    render = () => {
        return (
            <div>
                <Alert />
                 <div>
                    
                    
                </div>
                <Routes />
            </div>
        );
    }
}

function mapState(state) {
    const { loggedUser, loggedIn } = state.authentication
    return { loggedUser, loggedIn };
}

const actionCreators = {
    logout: userActions.logout
};

const connectedApp = connect(mapState, actionCreators)(App);

export { connectedApp as App };