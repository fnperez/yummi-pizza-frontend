import React from 'react'
import { Label, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

class Price extends React.Component {
    render = () => {
        const { price, currency } = this.props;

        console.log(currency);

        return (
            <Label size='big' color='yellow'>
                <Icon name={ currency } /> { price.getPrice(currency) }
            </Label>       
        )
    }   
}

function mapState(state) {
    const { currency } = state.catalog.cart;

    return { currency };
}

const actionCreators = {};

const connectedPrice = connect(mapState, actionCreators)(Price);

export { connectedPrice as Price };