export const encrypt = s => {

    let hashed = String(s.split('').reduce((a, b) => {
        a = ((a << process.env.REACT_APP_NUMBER) - a) + b.charCodeAt(0);
        return a & a
    }, 0))
    
    const rearrange = [];
    const secret = process.env.REACT_APP_SECRET;
    for (let i = 0; i < hashed.length; i++) {
        const randomNumber = hashed[i] + hashed[i + 2 || 5];
        rearrange.push(secret[randomNumber])
        rearrange.push(hashed[i])
    }

    return rearrange.reverse().join('')

}
