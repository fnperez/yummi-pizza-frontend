export class Price {
    constructor(price) {
        this.price = price;
    }

    getPrice(currency = 'usd') {
        return this.price[currency] ?? this.price['usd'];
    } 
}