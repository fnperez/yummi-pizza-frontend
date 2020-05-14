import React, { Component } from "react";
import { MainMenu, ItemProduct, CardProduct, Price } from '../_components';
import { Container, Grid, Segment, Icon, Input, Item, CardGroup, Button, Header, Divider } from 'semantic-ui-react';
import { productsActions, cartActions } from "../_actions";
import { connect } from "react-redux";

class CatalogPage extends Component {
    componentDidMount = () => {
        this.props.loadProducts();
    }

    renderProducts = () => {
        const { items } = this.props;

        const cards = Object.values(items).map((product) => {
            return (
                <CardProduct 
                    key={product.id} 
                    product={product} 
                />
            )
        });

        return (
            <CardGroup itemsPerRow={3}>
                {cards}
            </CardGroup>
        )
    }

    renderItems = () => {
        const { addedItems } = this.props;

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
                {items}
            </Item.Group>
        )
    }

    renderPayment = () => {
        const { total, totalPrice } = this.props;

        if (! total ) return undefined;

        return (
            <div>
                <Divider />
                <Item.Group divided relaxed>
                    <Item>
                        <Item.Content verticalAlign='bottom' header='Subtotal' />
                        
                        <Price animated price={totalPrice} />
                    </Item>
                </Item.Group>
            </div>
        ).props.children;
    }

    render() {
        const { loading, syncing } = this.props;

        return (
            <div>
                <MainMenu />
                <Container fluid style={{ padding: '1em' }}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={11}>
                                <Segment>
                                    <Input
                                        icon={<Icon name='search' inverted circular link />}
                                        placeholder='Search...'
                                        fluid
                                        size='large'
                                    />
                                </Segment>
                                <Segment basic loading={loading}>
                                    { this.renderProducts() }
                                </Segment>
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <Segment loading={syncing}>
                                    <Header size='large'>
                                        <Icon name='cart' /> Order
                                    </Header>
                                    <Divider />
                                    { this.renderItems() }
                                    { this.renderPayment() }
                                </Segment>
                            </Grid.Column>
                            
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
                
        );
    }
}

function mapState(state) {
    const { items, loading } = state.catalog.products;
    const { addedItems, syncing, total, totalPrice } = state.catalog.cart;

    return { 
        items, 
        addedItems, 
        loading,
        syncing,
        total,
        totalPrice
    } 
}

const actionCreators = {
    loadProducts: productsActions.browse,
    addToCart: cartActions.add,
};

const connectedCatalogPage = connect(mapState, actionCreators)(CatalogPage);

export { connectedCatalogPage as CatalogPage };