import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import { createStructuredSelector } from 'reselect';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHiddenAction } from '../../redux/cart/cart.actions';
import CartItem from '../cart-item/cart-item.component';
import CustomButton from '../custom-button/custom-button.component';
import './cart-dropdown.styles.scss';

const CartDropdown = ({ items, history, dispatch }) => (
	<div className="cart-dropdown">
		{items.length === 0
			? <p>You currently have no items in the cart</p> : (
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
					handleClick={() => {
						history.push('/checkout');
						dispatch(toggleCartHiddenAction());
					}}
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
	history: ReactRouterPropTypes.history.isRequired,
	dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
	items: selectCartItems,
});

export default withRouter(connect(mapStateToProps)(CartDropdown));
