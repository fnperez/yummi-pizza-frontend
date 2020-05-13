import React, { Component } from 'react';
import { Container, Menu, Segment, Dropdown, Button, Icon } from 'semantic-ui-react'
import { AuthMenuItem } from './';

class MainMenu extends Component {
    render = () => {
        const currencies = [
            {key: 'usd', text: 'USD', value: 'usd'},
            {key: 'eur', text: 'EUR', value: 'eur'}
        ]

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
                                defaultValue='usd'
                            />
                        </Menu.Item>
                        
                        <Menu.Item>
                            <Button animated='vertical' inverted>
                                <Button.Content hidden>Shop</Button.Content>
                                <Button.Content visible>
                                    <Icon name='shop' /> 23
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

export { MainMenu };