import React from 'react';
import { connect } from 'react-redux';
import { Segment, Header, Divider, Icon, Item } from 'semantic-ui-react';
import { Price, Payment } from './';
import { CartItems } from './';
import { cartActions } from '../_actions';

class PaymentStep extends React.Component {
    render = () => {
        const { address, paying, syncing } = this.props;

        return (
            <Segment loading={syncing || paying}>
                <Header content='Order' icon={<Icon name='cart' />} />
                <Divider />
                <CartItems />
                <Divider />
                <Item.Group divided relaxed>
                    <Item>
                        <Item.Content verticalAlign='bottom' header='Delivery' />
                        
                        <Price normal price={address.deliveryCost} />
                    </Item>
                </Item.Group>
                <Payment text='Total' onClick={() => this.props.pay(address.id)} />
            </Segment>
        );
    }
}


function mapState(state) {
    const { address } = state.catalog.address;
    const { paying, syncing } = state.catalog.cart;

    return { address, paying, syncing }
}

const actionCreators = {
    pay: cartActions.pay,
};

const connectedPaymentStep = connect(mapState, actionCreators)(PaymentStep);

export { connectedPaymentStep as PaymentStep };