import React from 'react';
import PropTypes from 'prop-types';

import './cart-item.styles.scss';

const CartItem = ({
	item: {
		imageUrl, price, name, quantity,
	},
}) => (
	<div className="cart-item">
		<div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
		<div className="name">{name}</div>
		<div className="quantity-and-price">{`${quantity} x $${price}`}</div>
	</div>
);

CartItem.propTypes = {
	item: PropTypes.shape({
		name: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		quantity: PropTypes.number.isRequired,
		imageUrl: PropTypes.string.isRequired,
	}).isRequired,
};

export default CartItem;
