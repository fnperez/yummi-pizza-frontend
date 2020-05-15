import React from 'react';
import { connect } from 'react-redux';
import { ItemProduct } from './';
import { Item } from 'semantic-ui-react';

class CartItems extends React.Component {
    render = () => {
        const { addedItems, total } = this.props;

        const items = Object.values(addedItems).map(item => {
            return (
                <ItemProduct
                    key={item.id} 
                    item={item}
                />
            )
        });

        return (
            <Item.Group divided relaxed>
                {items.length ? items : 'No items '}
            </Item.Group>
        )
    }
}

function mapState(state) {
    const { addedItems, total } = state.catalog.cart;

    return { 
        addedItems,
        total
    } 
}

const actionCreators = {};

const connectedCartItems = connect(mapState, actionCreators)(CartItems);

export { connectedCartItems as CartItems };