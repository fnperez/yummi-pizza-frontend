import React from 'react';
import { cartConstants } from '../_constants/cart.constants';
import { AddressStep, CartViewStep, PaymentStep } from './';
import { connect } from 'react-redux';
import { Segment, Header, Icon, Button } from 'semantic-ui-react';

class CartSteps extends React.Component {
    steps = {
        [cartConstants.CART_VIEW_STEP]: <CartViewStep nextStep={this.props.nextStep} />,
        [cartConstants.ADDRESS_STEP]: <AddressStep nextStep={this.props.nextStep} />,
        [cartConstants.PAYMENT_STEP]: <PaymentStep nextStep={this.props.nextStep} />,
        [cartConstants.THANKS_STEP]: (
            <Segment placeholder>
                <Header icon>
                    <Icon name='thumbs up outline' />
                    Thank you for your order
                </Header>
                <Button color='yellow' onClick={() => this.props.nextStep(cartConstants.CART_VIEW_STEP)}>Ok</Button>
            </Segment>
        ),
    };

    render = () => {
        const { step } = this.props;

        return this.steps[step];
    }
}


function mapState(state) {
    const { step } = state.catalog.cart;

    return { step }
}

const actionCreators = {
    nextStep: (step) => {
        return { type: cartConstants.NEXT_STEP, step }
    }
};

const connectedCartSteps = connect(mapState, actionCreators)(CartSteps);

export { connectedCartSteps as CartSteps };