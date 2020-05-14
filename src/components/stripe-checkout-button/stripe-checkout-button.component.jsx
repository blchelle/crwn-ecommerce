import React from 'react';
import PropTypes from 'prop-types';
import StripeCheckout from 'react-stripe-checkout';
import Logo from '../../assets/crown.svg';
import './stripe-checkout-button.styles.scss';

const StripeCheckoutButton = ({ price }) => {
	const priceForStripe = price * 100;
	const publishableKey = 'pk_test_DfMrpBgjjRIfCp4Sss8yffKO00UhALAih9';

	const onToken = (token) => {
		console.log(token);
		alert('Payment Successful');
	};

	return (
		<StripeCheckout
			className="stripe-checkout-button"
			label="Pay Now"
			name="CRWN Clothing Ltd."
			billingAddress
			shippingAddress
			image={Logo}
			description={`Your total is $${price}`}
			amount={priceForStripe}
			panelLabel="Pay Now"
			token={onToken}
			stripeKey={publishableKey}
		/>
	);
};

StripeCheckoutButton.propTypes = {
	price: PropTypes.number.isRequired,
};

export default StripeCheckoutButton;
