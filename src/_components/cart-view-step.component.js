import React from 'react';
import { connect } from 'react-redux';
import { Segment, Header, Icon, Divider } from 'semantic-ui-react';
import { CartItems, Payment } from './';
import { cartConstants } from '../_constants';

class CartViewStep extends React.Component {
    next = cartConstants.ADDRESS_STEP;

    render = () => {
        const { syncing } = this.props;

        return (
            <Segment loading={syncing}>
                <Header content='Order' icon={<Icon name='cart' />} />
                <Divider />
                <CartItems />
                <Divider />
                <Payment onClick={() => this.props.nextStep(this.next)} />
            </Segment>
        );
    }
}


function mapState(state, props) {
    const { syncing, total } = state.catalog.cart;

    return { syncing, total, ...props }
}

const actionCreators = {};

const connectedCartViewStep = connect(mapState, actionCreators)(CartViewStep);

export { connectedCartViewStep as CartViewStep };