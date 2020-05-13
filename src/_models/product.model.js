import { Price } from "./price.model";

export class Product {
    constructor(
        id,
        name,
        description,
        price,
        image_url,
        created_at,
        updated_at,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = image_url;
        this.createdAt = created_at;
        this.updatedAt = updated_at;
    }

    static fromJson(props) {
        return new Product(
            props.id,
            props.name,
            props.description,
            new Price(props.price),
            props.image_url,
            props.created_at,
            props.updated_at,
        )
    }

    getImageUrl(avoidCache = true) {
        return `${this.imageUrl}?v=${Math.random()}`;
    }
}