import PropTypes from 'prop-types';
import './Bottle.css';

const Bottle = ({bottle, handlePurchase}) => {
    const{name, price, img, seller} = bottle;

    return (
        <div className="bottle">
            <h3>{name}</h3>
            <img src={img} alt="" />
            <p>Seller: {seller}</p>
            <p>Price: {price}</p>
            <button onClick={()=>handlePurchase(bottle)}>Purchase</button>
        </div>
    );
};

Bottle.propTypes = {
    bottle: PropTypes.object.isRequired,
    handlePurchase: PropTypes.func.isRequired
}

export default Bottle;