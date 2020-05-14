import React from "react";
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Button, Loader, Popup } from 'semantic-ui-react'
import { authActions } from "../_actions";
import { connect } from "react-redux";
import { LoginPage } from '../LoginPage';
import { SignUpPage } from '../SingUpPage';

class AuthMenuItem extends React.Component {

    renderChild = () => {
        if (this.props.loggingIn) {
            return (
                <Loader active inline='centered' />
            );
        }

        if (this.props.loggedIn) {
            return (
                <Dropdown text='Account' button className='inverted'>
                    <Dropdown.Menu>
                        <Dropdown.Item as={ Link } to='/account/settings' content='Settings' />
                        <Dropdown.Item onClick={ this.props.logout } content='Logout' />
                    </Dropdown.Menu>
                </Dropdown>
            )
        }

        const loginButton = (
            <Button inverted style={{ marginLeft: '0.5em' }}>
                Log in
            </Button>
        );

        const signUpButton = (
            <Button inverted primary style={{ marginLeft: '0.5em' }}>
                Sign Up
            </Button>
        )

        return (
            <div>
                <Popup 
                    trigger={loginButton} 
                    on='click'
                    pinned
                    position='bottom right'
                    positionFixed
                    style={{ minWidth: 450 }}
                >
                    <Popup.Content >
                        <LoginPage />
                    </Popup.Content>
                </Popup>
                <Popup trigger={signUpButton} 
                    on='click'
                    pinned
                    position='bottom right'
                    positionFixed
                    style={{ minWidth: 450 }}
                >
                    <Popup.Content>
                        <SignUpPage />
                    </Popup.Content>
                </Popup>
            </div>   
        ).props.children;
    }

    render = () => {
        return (
            <Menu.Item>{ this.renderChild() } </Menu.Item>
        );
    }
}

function mapState(state) {
    const { loggingIn, loggedIn } = state.auth;

    return { loggingIn, loggedIn };
}

const actionCreators = {
    logout: authActions.logout
};

const connectedAuthMenuItem = connect(mapState, actionCreators)(AuthMenuItem);

export { connectedAuthMenuItem as AuthMenuItem }