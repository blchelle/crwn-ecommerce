import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeItemFromCartAction, addItemToCartAction, decrementItemQuantityAction } from '../../redux/cart/cart.actions';
import './checkout-item.styles.scss';

const CheckoutItem = ({
	item, addItem, removeItem, decrementItem,
}) => {
	const {
		imageUrl, name, quantity, price,
	} = item;

	return (
		<tr className="checkout-item">
			<td><img src={imageUrl} alt={name} /></td>
			<td>{name}</td>
			<td>
				<button type="button" onClick={item.quantity === 1 ? null : () => decrementItem(item)}>
					&#10094;
				</button>
				{quantity}
				<button type="button" onClick={() => addItem(item)}>&#10095;</button>
			</td>
			<td>{price}</td>
			<td><button type="button" onClick={() => removeItem(item)}>&#10005;</button></td>
		</tr>
	);
};

CheckoutItem.propTypes = {
	item: PropTypes.shape({
		imageUrl: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		quantity: PropTypes.number.isRequired,
		price: PropTypes.number.isRequired,
	}).isRequired,
	addItem: PropTypes.func.isRequired,
	decrementItem: PropTypes.func.isRequired,
	removeItem: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
	addItem: (item) => dispatch(addItemToCartAction(item)),
	decrementItem: (item) => dispatch(decrementItemQuantityAction(item)),
	removeItem: (item) => dispatch(removeItemFromCartAction(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
