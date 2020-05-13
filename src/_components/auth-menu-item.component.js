import React from "react";
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Button, Icon } from 'semantic-ui-react'
import { authActions } from "../_actions";
import { connect } from "react-redux";

class AuthMenuItem extends React.Component {

    renderChild = () => {
        if (this.props.loggingIn) {
            return (
                <Icon loading name='spinner' />
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

        return (
            <div>
                <Button as={ Link } to='/login' inverted style={{ marginLeft: '0.5em' }}>
                    Log in
                </Button>
                <Button as={ Link } to='/login' inverted primary style={{ marginLeft: '0.5em' }}>
                    Sign Up
                </Button>
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