import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { Alert } from '../_components/alert.component';
import Routes from '../routes';

class App extends React.Component {
     componentDidMount = () => {
        this.props.me();
    }

    render = () => {
        return (
            <div>
                <Alert />
                 <div>
                    { this.props.currentUser ? this.props.currentUser.email : undefined }
                </div>
                <Routes />
            </div>
        );
    }
}

function mapState(state) {
    const { currentUser } = state.auth
    return { currentUser };
}

const actionCreators = {
    me: userActions.me,
    logout: userActions.logout
};

const connectedApp = connect(mapState, actionCreators)(App);

export { connectedApp as App };