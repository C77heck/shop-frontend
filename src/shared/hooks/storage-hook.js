


export const useStorage = () => {

    let products;

    const priceCalculation = (array) => {

        const repricedArray = array.map(i => {
            return i.price = i.number * Number(i.price);

        })

        return repricedArray.reduce((a, i) => { return a + i }, 0)
    }

    try {
        products = JSON.parse(localStorage.getItem('basketContent'))
        products = products.products;
    } catch (err) {
        console.log(err)
    }


    const amount = products.reduce((a, i) => {
        return a + i.number
    }, 0)
    const price = priceCalculation(products);


    return { amount, price }
}