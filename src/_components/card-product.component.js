import React from "react";
import { Card, Button, Label, Image, Icon } from 'semantic-ui-react';

export class CardProduct extends React.Component {
    render = () => {
        const { product, currency, quantity, onClick, loading=false } = this.props;

        return (
            <Card raised>
                <Image src='http://api.yummi-pizza.local:8081/assets/images/products/qhO65r3rfWb0vro3OrozztMuI7hfDfMKuqn6UeLX.png' wrapped ui={false} />
                <Card.Content>
                    <Card.Header textAlign='center' content={ product.name } />
                    <Card.Description textAlign='center' content={ product.description } />
                </Card.Content>
                <Card.Content extra>
                    <Label size='big' color='yellow'>
                        <Icon name={ currency } /> { product.price.getPrice(currency) }
                    </Label>
                    
                    <Button
                        floated='right'
                        icon='plus'
                        color='yellow'
                        alt='Add to cart'
                        label={quantity}
                        size='large'
                        labelPosition='left'
                        loading={loading}
                        onClick={onClick}
                    />
                </Card.Content>
            </Card>
        );
    }
}