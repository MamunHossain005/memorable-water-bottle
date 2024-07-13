const getStoredCart = () => {
    const storedCartString = localStorage.getItem('cart');
    if(storedCartString){
        return JSON.parse(storedCartString);
    }
    return [];
}

const addToLocalStorage = value => {
    const cart = getStoredCart();
    cart.push(value);
    localStorage.setItem('cart', JSON.stringify(cart));
}

const removeFromLocalStorage = id => {
    const cart = getStoredCart();
    const remaining = cart.filter(idx => idx !== id);
    localStorage.setItem('cart', JSON.stringify(remaining));
}

export {addToLocalStorage, getStoredCart, removeFromLocalStorage};