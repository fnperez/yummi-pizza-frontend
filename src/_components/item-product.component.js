import React from 'react';
import { connect } from 'react-redux';
import { cartActions } from '../_actions';
import { Item, Button } from 'semantic-ui-react';
import { Price } from './';

class ItemProduct extends React.Component {
    render = () => {
        const { item, removing } = this.props;

        return (
            <Item>
                <Item.Content verticalAlign='middle'>
                    { item.quantity }x { item.name }
                </Item.Content>
                <Price normal price={item.totalPrice} />
                <Button 
                    icon='trash' 
                    size='tiny' 
                    compact 
                    color='red'
                    loading={removing}
                    onClick={() => this.props.remove(item.id)}
                />
            </Item>
        )
    }
}

function mapState(state, props) {
    const { addingItems, removingItems } = state.catalog.cart;
        
    return { 
        adding: addingItems ? addingItems[props.item.id] : false,
        removing: removingItems ? removingItems[props.item.id] : false,
        ...props
    };
}

const actionCreators = {
    remove: cartActions.remove
};

const connectedItemProduct = connect(mapState, actionCreators)(ItemProduct);

export { connectedItemProduct as ItemProduct };