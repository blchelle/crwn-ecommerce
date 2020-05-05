import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeItemQuantityAction, removeItemFromCartAction } from '../../redux/cart/cart.actions';
import './chekout-item.styles.scss';

const CheckoutItem = ({
	item, changeItemQuantity, removeItem,
}) => {
	const {
		imageUrl, name, quantity, price, id,
	} = item;

	return (
		<tr className="checkout-item">
			<td><img src={imageUrl} alt={name} /></td>
			<td>{name}</td>
			<td>
				<button type="button" onClick={() => changeItemQuantity(quantity - 1, id)}>&lt;</button>
				{quantity}
				<button type="button" onClick={() => changeItemQuantity(quantity + 1, id)}>&gt;</button>
			</td>
			<td>{price}</td>
			<td><button type="button" onClick={() => removeItem(id)}>&#10005;</button></td>
		</tr>
	);
};

CheckoutItem.propTypes = {
	item: PropTypes.shape({
		imageUrl: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		quantity: PropTypes.number.isRequired,
		price: PropTypes.number.isRequired,
		id: PropTypes.number.isRequired,
	}).isRequired,
	changeItemQuantity: PropTypes.func.isRequired,
	removeItem: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
	changeItemQuantity: (quantity, id) => dispatch(changeItemQuantityAction(quantity, id)),
	removeItem: (id) => dispatch(removeItemFromCartAction(id)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
