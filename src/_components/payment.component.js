import React from 'react';
import { Item } from 'semantic-ui-react';
import { Price } from './';
import { connect } from 'react-redux';

class Payment extends React.Component {
    render = () => {
        const { total, totalPrice, text = 'Subtotal' } = this.props;
        return (
            <Item.Group divided relaxed>
                <Item>
                    <Item.Content verticalAlign='bottom' header={text} />
                    
                    <Price onClick={total ? this.props.onClick : () => {} } animated price={totalPrice} />
                </Item>
            </Item.Group>
        );
    }
}

function mapState(state, props) {
    const { total, totalPrice } = state.catalog.cart;

    return { 
        total,
        totalPrice,
        ...props
    } 
}

const actionCreators = {};

const connectedPayment = connect(mapState, actionCreators)(Payment);

export { connectedPayment as Payment };