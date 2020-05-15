import React, { Component } from 'react';
import { Container, Menu, Segment, Dropdown } from 'semantic-ui-react'
import { AuthMenuItem } from './';
import { cartActions } from '../_actions/cart.actions';
import { connect } from 'react-redux';

class MainMenu extends Component {
    render = () => {
        const { currencies, currency } = this.props;

        return (
            <Segment
                inverted
                textAlign='center'
                vertical
            >
                <Menu
                    inverted
                    pointing
                >
                <Container fluid>
                    <Menu.Item header>
                        <img src='/logo512.png' alt='Yummi Pizza'/>
                    </Menu.Item>

                    <Menu.Menu position='right'>
                        <Menu.Item style={{ padding: 5 }}>
                            <Dropdown
                                placeholder='Currency'
                                selection
                                fluid
                                options={currencies}
                                defaultValue={currency}
                                onChange={(e, data) => this.props.switchCurrency(data.value)}
                            />
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
    const { currencies, currency } = state.catalog.cart;

    return { 
        currencies, 
        currency, 
    };
}

const actionCreators = {
    switchCurrency: cartActions.switchCurrency
};

const connectedMainMenu = connect(mapState, actionCreators)(MainMenu);

export { connectedMainMenu as MainMenu };