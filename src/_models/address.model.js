import { Price } from './';

class Address {
    constructor(
        id,
        street_name,
        street_number,
        floor,
        state,
        city,
        phone_number,
        delivery_cost,
    ) {
        this.id = id;
        this.streetName = street_name;
        this.streetNumber = street_number;
        this.floor = floor;
        this.state = state;
        this.city = city;
        this.phoneNumber = phone_number;
        this.deliveryCost = delivery_cost;
    }

    static fromJson(props) {
        return new Address(
            props.id,
            props.street_name,
            props.street_number,
            props.floor,
            props.state,
            props.city,
            props.phone_number,
            new Price(props.delivery_cost),
        );
    }
}

export { Address }