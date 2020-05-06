import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './checkout.styles.scss';
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

const CheckoutPage = ({ items, total }) => (
	<div className="checkout-page">
		<table className="checkout-table">
			<thead>
				<tr>
					<th>Product</th>
					<th>Description</th>
					<th>Quantity</th>
					<th>Price</th>
					<th>Remove</th>
				</tr>
			</thead>
			<tbody>
				{
					items.map((item) => (
						<CheckoutItem key={item.id} item={item} />
					))
				}
			</tbody>
		</table>
		<h2 className="total-price">
			{`Total: $${total}`}
		</h2>
		<span className="hint-text">*Please use the following test credit card for payments*</span>
		<span className="hint-text">4242 4242 4242 4242 &mdash; Exp: 01/20 &mdash; CW: 123</span>
	</div>
);

CheckoutPage.defaultProps = {
	items: [],
};

CheckoutPage.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({
		imageUrl: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		quantity: PropTypes.number.isRequired,
		price: PropTypes.number.isRequired,
		id: PropTypes.number.isRequired,
	}).isRequired),
	total: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector(
	{
		items: selectCartItems,
		total: selectCartTotal,
	},
);

export default connect(mapStateToProps)(CheckoutPage);
