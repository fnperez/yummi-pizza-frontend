import React from 'react';
import { connect } from 'react-redux';
import { authActions } from '../_actions';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class LoginPage extends React.Component {
    state = {
        email: '',
        password: '',
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.submit(this.state);
    }

    render = () => {
        const { loggingIn, error } = this.props;

        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    <Image src='/logo512.png' /> Log-in to your account
                </Header>

                <Form size='large' loading={ loggingIn } error={ error !== undefined }>
                    <Segment stacked>
                        <Form.Input 
                            fluid 
                            focus
                            icon='envelope open' 
                            iconPosition='left' 
                            placeholder='E-mail address'
                            onChange={ this.handleChange }
                            type="email"
                            name='email'
                            error={ error && error.errors.email }
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            name='password'
                            onChange={ this.handleChange }
                            error={ error && error.errors.password }
                        />

                        <Button 
                            fluid
                            color='teal' 
                            size='large' 
                            onClick={ this.handleSubmit }
                        >
                            Login
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    New to us? <Link to='/sign-up'>Sign Up</Link>
                </Message>
                </Grid.Column>
            </Grid>
        );
    }
}

function mapState(state) {
    const { loggingIn, error } = state.auth;
    return { loggingIn, error };
}

const actionCreators = {
    submit: authActions.login
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);

export { connectedLoginPage as LoginPage };