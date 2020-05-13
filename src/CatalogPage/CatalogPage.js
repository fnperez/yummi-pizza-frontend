import React, { Component } from "react";
import { MainMenu } from '../_components';
import { Container, Grid, Segment, Icon, Input, CardGroup, Loader } from 'semantic-ui-react';
import { productsActions } from "../_actions";
import { CardProduct } from "../_components/card-product.component";
import { connect } from "react-redux";

class CatalogPage extends Component {
    componentDidMount = () => {
        this.props.loadProducts();
    }

    renderProducts = () => {
        const { items, loading } = this.props.products;

        if (loading) {
            return (
                <Loader active inline='centered' size='large' />
            );
        }

        const cards = items.map(product => {
            return <CardProduct 
                        key={product.id} 
                        product={product} 
                        currency='usd' 
                        quantity={(Math.random() * 10).toPrecision(1)}
                        onClick={}
                    />
        });

        return (
            <CardGroup itemsPerRow={3}>
                {cards}
            </CardGroup>
        )
    }

    render() {
        return (
            <div>
                <MainMenu />
                <Container fluid style={{ padding: '1em' }}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={5}>
                                <Segment>
                                    <Input
                                        icon={<Icon name='search' inverted circular link />}
                                        placeholder='Search...'
                                        fluid
                                        size='large'
                                    />
                                </Segment>
                            </Grid.Column>
                            <Grid.Column width={11}>
                                { this.renderProducts() }
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
                
        );
    }
}

function mapState(state) {
    return state.catalog;
}

const actionCreators = {
    loadProducts: productsActions.browse,
};

const connectedCatalogPage = connect(mapState, actionCreators)(CatalogPage);

export { connectedCatalogPage as CatalogPage };