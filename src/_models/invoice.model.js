import { Price } from './';
import { User } from './user.model';
import { Address } from './address.model';
import { Item } from './item.model';

class Invoice {
    constructor(
        id,
        sub_total,
        delivery_cost,
        total_price,
        customer,
        address,
        items,
        created_at,
        updated_at,
    ) {
        this.id = id;
        this.subTotal = sub_total;
        this.deliveryCost = delivery_cost;
        this.totalPrice = total_price;
        this.customer = customer;
        this.address = address;
        this.items = items;
        this.createdAt = created_at;
        this.updatedAt = updated_at;
   }

   static fromJson(props) {
       return new Invoice(
        props.id,
        new Price(props.sub_total),
        new Price(props.delivery_cost),
        new Price(props.total_price),
        props.customer ? User.fromJson(props.customer) : null,
        Address.fromJson(props.address),
        props.items.map(Item.fromJson),
        props.created_at,
        props.updated_at,
       )
   }
}

export { Invoice }