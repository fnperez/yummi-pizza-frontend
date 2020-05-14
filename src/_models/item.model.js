import { Price } from './';

export class Item {
    constructor(
        id,
        name,
        price,
        totalPrice,
        quantity,
        productId,
        cartId,
    ) {
        this._id = id;
        this.id = productId
        this.name = name;
        this.price = price;
        this.totalPrice = totalPrice;
        this.quantity = quantity;
        this.cartId = cartId;
    }

    static fromJson(props) {
        return new Item(
            props.id,
            props.name,
            new Price(props.price),
            new Price(props.total_price),
            props.quantity,
            props.product.id,
            props.cart.id,
        )
    }
}