import React from 'react';
import { Segment, Header, Icon, Divider, Form, Message, Button } from "semantic-ui-react";
import { connect } from 'react-redux';
import { addressActions } from '../_actions';

class AddressStep extends React.Component {
    state = {
        street_name: '',
        street_number: '',
        floor: '',
        state: '',
        city: '',
        phone_number: '',
    }

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
            <Segment>
                <Header content='Delivery address' icon={<Icon name='address card'/>}/>
                <Divider />
                <Form size='large' loading={ loading } error={ error !== undefined }>
                    <Message error content={ error && error.description }/>
                        <Form.Input 
                            fluid
                            icon='home' 
                            iconPosition='left' 
                            placeholder='Street Name'
                            onChange={ this.handleChange }
                            type="text"
                            name='street_name'
                            error={ error && error.errors.street_name }
                        />
                        <Form.Input 
                            fluid
                            placeholder='Street Number'
                            icon='building' 
                            iconPosition='left' 
                            onChange={ this.handleChange }
                            type="text"
                            name='street_number'
                            error={ error && error.errors.street_number }
                        />
                        <Form.Input
                            fluid
                            placeholder='Floor'
                            icon='bullhorn' 
                            iconPosition='left' 
                            type='text'
                            name='floor'
                            onChange={ this.handleChange }
                            error={ error && error.errors.floor }
                        />
                    
                        <Form.Input
                            fluid
                            placeholder='State'
                            icon='map marker'
                            iconPosition='left'
                            type='text'
                            name='state'
                            onChange={ this.handleChange }
                            error={ error && error.errors.state }
                        />
                        <Form.Input
                            fluid
                            placeholder='City'
                            icon='map marker alternate'
                            iconPosition='left'
                            type='text'
                            name='city'
                            onChange={ this.handleChange }
                            error={ error && error.errors.city }
                        />
                    <Form.Input
                        fluid
                        icon='phone'
                        iconPosition='left'
                        placeholder='Phone Number'
                        type='tel'
                        name='phone_number'
                        onChange={ this.handleChange }
                        error={ error && error.errors.phone_number }
                    />

                    <Button 
                        fluid
                        color='yellow' 
                        size='large' 
                        onClick={ this.handleSubmit }
                    >
                        Continue 
                        <Icon name='arrow right' />
                    </Button>
                </Form>
            </Segment>
        );
    }    
}

function mapState(state, props) {
    const { loading, error } = state.catalog.address;

    return { loading, error, ...props } 
}

const actionCreators = {
    submit: addressActions.add,
};

const connectedAddressStep = connect(mapState, actionCreators)(AddressStep);

export { connectedAddressStep as AddressStep };