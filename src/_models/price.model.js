export class Price {
    constructor(price) {
        this.price = price;
    }

    getPrice(currency = 'usd') {
        const price = this.price[currency] ?? this.price['usd'];

        return price;
    }

    add(oPrice) {
        const currencies = window.currencies;

        currencies.forEach(currency => {
            this.price[currency.value] += oPrice.getPrice(currency.value);
        })   
    }

    static initValue() {
        const currencies = window.currencies;
        let price = {};

        currencies.forEach(currency => {
            price[currency.value] = 0;
        })

        return new Price(price);
    }
}