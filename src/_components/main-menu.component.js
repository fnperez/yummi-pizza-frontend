import React, { Component } from 'react';
import { Container, Menu, Segment, Dropdown, Button, Icon } from 'semantic-ui-react'
import { AuthMenuItem } from './';
import { cartActions } from '../_actions/cart.actions';
import { connect } from 'react-redux';

class MainMenu extends Component {
    render = () => {
        const { cartTotalItems, currencies, currency, syncingCart } = this.props;

        return (
            <Segment
                inverted
                textAlign='center'
                style={{ padding: '1em 0em' }}
                vertical
            >
                <Menu
                    inverted
                    pointing
                    size='large'
                >
                <Container fluid>
                    <Menu.Item header>
                        <img src='/logo512.png' alt='Yummi Pizza'/>
                    </Menu.Item>

                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Dropdown
                                placeholder='Currency'
                                selection
                                fluid
                                options={currencies}
                                defaultValue={currency}
                                onChange={(e, data) => this.props.switchCurrency(data.value)}
                            />
                        </Menu.Item>
                        
                        <Menu.Item>
                            <Button animated='vertical' inverted color='yellow' loading={syncingCart}>
                                <Button.Content hidden>
                                    <Icon name='credit card' /> Pay
                                </Button.Content>
                                <Button.Content visible>
                                    <Icon name='shop' /> { cartTotalItems }
                                </Button.Content>
                            </Button>
                        </Menu.Item>

                        <AuthMenuItem />
                    </Menu.Menu>
                </Container>
                </Menu>
            </Segment>
        )
    }
}
function mapState(state) {
    const { total, currencies, currency, syncing } = state.catalog.cart;

    return { 
        cartTotalItems: total,
        syncingCart: syncing,
        currencies, 
        currency, 
    };
}

const actionCreators = {
    switchCurrency: cartActions.switchCurrency
};

const connectedMainMenu = connect(mapState, actionCreators)(MainMenu);

export { connectedMainMenu as MainMenu };