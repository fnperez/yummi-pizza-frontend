import React from "react";
import { Card, Button, Label, Image, Icon } from 'semantic-ui-react';
import { Price } from "./";

export class CardProduct extends React.Component {
    render = () => {
        const { product, quantity, onClick, loading=false } = this.props;

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
                        loading={loading}
                        onClick={onClick}
                    />
                </Card.Content>
            </Card>
        );
    }
}