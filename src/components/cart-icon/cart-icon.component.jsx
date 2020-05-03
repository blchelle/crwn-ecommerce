import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toggleCartHiddenAction from '../../redux/cart/cart.actions';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = ({ toggleCartHidden }) => (
	<button className="cart-icon" type="button" onClick={toggleCartHidden}>
		<ShoppingIcon className="shopping-icon" />
		<span className="item-count">0</span>
	</button>
);

CartIcon.propTypes = {
	toggleCartHidden: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
	toggleCartHidden: () => dispatch(toggleCartHiddenAction()),
});

export default connect(null, mapDispatchToProps)(CartIcon);
