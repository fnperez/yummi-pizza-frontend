const getCartId = () => {
    return localStorage.getItem('cart_id') ?? undefined;
}

const hasCartId = () => {
    return getCartId() !== undefined;
}

const setCartId = (id) => {
    localStorage.setItem('cart_id', id);
}

const dropCartId = () => {
    localStorage.removeItem('cart_id');
}

const checkStatus = (error) => {
    console.log(error);
    
    if (error.status === 40004 || error.status === 40001) {
        dropCartId()
    }
    
    return error;
}

export {
    getCartId,
    hasCartId,
    setCartId,
    dropCartId,
    checkStatus
}