import React, { Component, createRef } from "react";
import { MainMenu, CardProduct, CartSteps } from '../_components';
import { Container, Grid, Segment, CardGroup, Ref, Sticky, Header, Icon, Divider } from 'semantic-ui-react';
import { productsActions, cartActions } from "../_actions";
import { connect } from "react-redux";

class CatalogPage extends Component {
    contextRef = createRef();
    
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

    render() {
        const { loading } = this.props;

        return (
            <div>
                <MainMenu />
                <Ref innerRef={this.contextRef}>
                    <Container fluid style={{ padding: '1em' }}>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={11}>
                                    <Segment loading={loading}>
                                    <Header content='Products' icon={<Icon name='food' />} />
                                    <Divider />
                                    { this.renderProducts() }
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column width={5}>
                                    <Sticky context={this.contextRef}>
                                        <CartSteps />
                                    </Sticky>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                </Ref>
            </div>
                
        );
    }
}

function mapState(state) {
    const { items, loading } = state.catalog.products;

    return { items, loading, changeStep: state.catalog.cart } 
}

const actionCreators = {
    loadProducts: productsActions.browse,
    addToCart: cartActions.add,
};

const connectedCatalogPage = connect(mapState, actionCreators)(CatalogPage);

export { connectedCatalogPage as CatalogPage };