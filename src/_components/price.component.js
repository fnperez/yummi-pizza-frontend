import React from 'react'
import { Label, Icon, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

class Price extends React.Component {
    render = () => {
        const { price, currency, normal = false, animated = false, onClick } = this.props;

        if (animated) {
            return (
                <Button animated='vertical' color='yellow' onClick={onClick}>
                    <Button.Content hidden>
                        <Icon name='credit card' /> Pay
                    </Button.Content>
                    <Button.Content visible>
                        <Icon name={ currency } />{ price.getPrice(currency).toFixed(2) }
                    </Button.Content>
                </Button>
            );
        }

        const labelProps = normal ? {} : {
            size: 'big',
        }

        return (
            <Label {...labelProps}>
                <Icon name={ currency } /> { price.getPrice(currency).toFixed(2) }
            </Label>       
        )
    }   
}

function mapState(state) {
    const { currency } = state.catalog.cart;

    return { currency };
}

const actionCreators = {};

const connectedPrice = connect(mapState, actionCreators)(Price);

export { connectedPrice as Price };