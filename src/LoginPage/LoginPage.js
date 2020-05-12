import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;
        if (email && password) {
            this.props.login(email, password);
        }
    }

    render() {
        const { loggingIn, error } = this.props;
        const { email, password, submitted } = this.state;

        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    <Image src='/logo512.png' /> Log-in to your account
                </Header>

                <Form size='large' error={ error !== undefined }>
                    <Message
                        error
                        className={ error ? 'error' : null }
                        header={ error ? error.message : null }
                        content={ error ? error.description : null }
                    />
                    <Segment stacked>
                        <Form.Input 
                            fluid 
                            focus
                            icon='user' 
                            iconPosition='left' 
                            placeholder='E-mail address'
                            onChange={ this.handleChange }
                            type="email"
                            name='email'
                            error={ submitted && !email }
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            name='password'
                            onChange={ this.handleChange }
                            error={ submitted && !password }
                        />

                        <Button 
                            fluid
                            loading={ loggingIn }
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
    const { loggingIn, error } = state.authentication;
    return { loggingIn, error };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);

export { connectedLoginPage as LoginPage };