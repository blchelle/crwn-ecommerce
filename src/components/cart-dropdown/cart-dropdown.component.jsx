import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CartItem from '../cart-item/cart-item.component';
import CustomButton from '../custom-button/custom-button.component';

import './cart-dropdown.styles.scss';

const CartDropdown = ({ items }) => (
	<div className="cart-dropdown">
		{items.length === 0
			? <p className="no-items-text">You currently have no items in the cart</p> : (
				<div className="cart-items">
					{
						items.map((item) => <CartItem key={items.id} item={item} />)
					}
				</div>
			)}
		{items.length === 0
			? null
			: (
				<CustomButton
					className="button"
					type="button"
					handleClick={() => console.log('clicked')}
				>
					Go to checkout
				</CustomButton>
			)}
	</div>
);

CartDropdown.defaultProps = {
	items: [],
};

CartDropdown.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		quantity: PropTypes.number.isRequired,
		imageUrl: PropTypes.string.isRequired,
	}).isRequired),
};

const mapStateToProps = ({ cart: { items } }) => ({
	items,
});

export default connect(mapStateToProps)(CartDropdown);
