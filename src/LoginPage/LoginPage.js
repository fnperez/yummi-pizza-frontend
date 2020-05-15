import React from 'react';
import { connect } from 'react-redux';
import { authActions } from '../_actions';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

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
        const { loading, error } = this.props;

        return (
            <Grid textAlign='center' verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' textAlign='center'>
                    <Image src='/logo512.png' /> Log-in to your account
                </Header>

                <Form 
                    size='large' 
                    loading={ loading } 
                    error={ error !== undefined }
                    autoComplete={false}
                >
                    <Message error content={ error && error.description }/>
                    <Segment>
                        <Form.Input 
                            fluid 
                            focus
                            icon='envelope open' 
                            iconPosition='left' 
                            placeholder='E-mail address'
                            onChange={ this.handleChange }
                            type="email"
                            name='email'
                            error={ error && error.errors && error.errors.email }
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            name='password'
                            onChange={ this.handleChange }
                            error={ error && error.errors && error.errors.password }
                        />

                        <Button 
                            fluid
                            color='yellow' 
                            size='large' 
                            onClick={ this.handleSubmit }
                        >
                            Login
                        </Button>
                    </Segment>
                </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

function mapState(state) {
    const { loading, error } = state.auth;
    return { loading, error };
}

const actionCreators = {
    submit: authActions.login
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);

export { connectedLoginPage as LoginPage };