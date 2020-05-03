import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleCartHiddenAction } from '../../redux/cart/cart.actions';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = ({ numItems, toggleCartHidden }) => (
	<button className="cart-icon" type="button" onClick={toggleCartHidden}>
		<ShoppingIcon className="shopping-icon" />
		<span className="item-count">{numItems}</span>
	</button>
);

CartIcon.propTypes = {
	numItems: PropTypes.number.isRequired,
	toggleCartHidden: PropTypes.func.isRequired,
};

const mapStateToProps = ({ cart: { items } }) => ({
	numItems: items.length,
});

const mapDispatchToProps = (dispatch) => ({
	toggleCartHidden: () => dispatch(toggleCartHiddenAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
