export const priceDisplay = (money) => {
    let price = { beforeDot: '', afterDot: '' };
    if (money > 0) {
        if (money % 1 === 0) {

            price.beforeDot = String(money)
            price.afterDot = '.00'

        } else {
            let index = String(money).indexOf(".");

            price.beforeDot = String(money).slice(0, index)
            price.afterDot = String(money).slice(index, index + 3)
        }

    } else {

        price.beforeDot = '00'
        price.afterDot = '.00'

    }
    return price;
}