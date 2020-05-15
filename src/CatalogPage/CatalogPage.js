import React, { Component, createRef } from "react";
import { MainMenu, CardProduct, CartSteps } from '../_components';
import { Container, Grid, Segment, CardGroup, Ref, Sticky, Header, Icon, Divider, Responsive } from 'semantic-ui-react';
import { productsActions, cartActions } from "../_actions";
import { connect } from "react-redux";

class CatalogPage extends Component {
    contextRef = createRef();
    
    componentDidMount = () => {
        this.props.loadProducts();
    }

    renderProducts = (perRow = 1) => {
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
            <CardGroup itemsPerRow={perRow}>
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
                    <Container fluid style={{ padding: window.innerWidth <= 450 ? 0 : '1em' }}>
                        <Responsive minWidth={750}>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={11}>
                                        <Segment loading={loading}>
                                            <Header content='Products' icon={<Icon name='food' />} />
                                            <Divider />
                                            { this.renderProducts(3) }
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                        <Sticky context={this.contextRef}>
                                            <CartSteps />
                                        </Sticky>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Responsive>
                        <Responsive maxWidth={750}>
                            <Grid>
                                <Grid.Row>
                                    <Segment loading={loading} basic>
                                        <Header content='Products' icon={<Icon name='food' />} />
                                        <Divider />
                                        { this.renderProducts() }
                                    </Segment>
                                </Grid.Row>
                                <Grid.Row>
                                    <Segment basic style={{width: '100%'}}>
                                        <CartSteps />
                                    </Segment>
                                </Grid.Row>
                            </Grid>
                        </Responsive>
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