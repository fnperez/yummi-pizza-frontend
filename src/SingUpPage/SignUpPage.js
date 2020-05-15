import React from 'react';
import { connect } from 'react-redux';
import { authActions } from '../_actions';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

class SignUpPage extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
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
        const { registering, error } = this.props;

        return (
            <Grid textAlign='center' verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 380 }}>
                <Header as='h2' textAlign='center'>
                    <Image src='/logo512.png' /> Create an account
                </Header>

                <Form size='large' loading={ registering } error={ error !== undefined } autoComplete={false}>
                    <Message error content={ error && error.description }/>

                    <Segment>
                        <Form.Input 
                            fluid
                            focus
                            icon='user' 
                            iconPosition='left' 
                            placeholder='Name'
                            onChange={ this.handleChange }
                            type="text"
                            name='name'
                            error={ error && error.errors.name }
                        />
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
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Repeat password'
                            type='password'
                            name='password_confirmation'
                            onChange={ this.handleChange }
                            error={ error && error.errors.password_confirmation }
                        />

                        <Button 
                            fluid
                            color='yellow' 
                            size='large' 
                            onClick={ this.handleSubmit }
                        >
                            Create account
                        </Button>
                    </Segment>
                </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

function mapState(state) {
    const { registering, error } = state.singUp;
    
    return { registering, error };
}

const actionCreators = {
    submit: authActions.register,
};

const connectedSignUpPage = connect(mapState, actionCreators)(SignUpPage);

export { connectedSignUpPage as SignUpPage };