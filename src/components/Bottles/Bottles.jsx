import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css'
import { addToLocalStorage, getStoredCart, removeFromLocalStorage } from "../../utilities/localStorage";
import Cart from "../Cart/Cart";

const Bottles = () => {
    const[bottles, setBottles] = useState([]);
    const[purchaseBottles, setPurchaseBottles] = useState([]);

    useEffect(()=>{
        fetch('bottle.json')
        .then(res => res.json())
        .then(data => setBottles(data));
    }, []);

    //load cart from local storage
    useEffect(()=>{
        if(bottles.length > 0){
            const storedCart = getStoredCart();
            const savedCart = [];

            for(let id of storedCart){
                const bottle = bottles.find(bottle => bottle.id === id);
                if(bottle){
                    savedCart.push(bottle);
                }
            }

            setPurchaseBottles(savedCart);
        }
    }, [bottles])

    const handlePurchase = purchaseBottle => {
        const newPurchaseBottles = [...purchaseBottles, purchaseBottle];
        setPurchaseBottles(newPurchaseBottles);
        addToLocalStorage(purchaseBottle.id);
    }

    const handleRemove = id => {
        // remove from local storage
        removeFromLocalStorage(id);
        // remove from cart
        const remaining = purchaseBottles.filter(bottle => bottle.id !== id);
        setPurchaseBottles(remaining);
    }

    return (
        <div>
            <h3>Available Bottles: {bottles.length}</h3>
            <Cart cart={purchaseBottles} handleRemove={handleRemove}></Cart>
            <div className="bottles-container">
                {bottles.map(bottle => <Bottle key={bottle.id} bottle={bottle} handlePurchase={handlePurchase}></Bottle>)}
            </div>
        </div>
    );
};

export default Bottles;