import React from "react";
import { Card, Button, Image } from 'semantic-ui-react';
import { connect } from "react-redux";
import { Price } from './'; 
import { cartActions } from "../_actions";

class CardProduct extends React.Component {
    render = () => {
        const { product, quantity, adding, syncing } = this.props;

        return (
            <Card raised>
                <Image src={product.getImageUrl()} wrapped ui={false} />
                <Card.Content>
                    <Card.Header textAlign='center' content={ product.name } />
                    <Card.Description textAlign='center' content={ product.description } />
                </Card.Content>
                <Card.Content extra>
                    <Price price={product.price} />

                    <Button
                        floated='right'
                        icon='plus'
                        color='yellow'
                        alt='Add to cart'
                        label={quantity}
                        size='large'
                        labelPosition='left'
                        loading={adding}
                        disabled={syncing}
                        onClick={() => this.props.addToCart(product.id)}
                    />
                </Card.Content>
            </Card>
        );
    }
}

function mapState(state, props) {
    const { addedItems, addingItems, syncing } = state.catalog.cart;
    
    const item = addedItems[props.product.id] ?? undefined;
    
    return { 
        quantity: item ? item.quantity : 0,
        adding: addingItems ? addingItems[props.product.id] : false,
        syncing,
        ...props 
    };
}

const actionCreators = {
    addToCart: cartActions.add
};

const connectedCardProduct = connect(mapState, actionCreators)(CardProduct);

export { connectedCardProduct as CardProduct };