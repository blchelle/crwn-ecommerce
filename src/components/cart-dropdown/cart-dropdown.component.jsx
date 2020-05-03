import React from 'react';

import CustomButton from '../custom-button/custom-button.component';

import './cart-dropdown.styles.scss';

const CartDropdown = () => (
	<div className="cart-dropdown">
		<div className="cart-items" />
		<CustomButton
			className="button"
			type="button"
			handleClick={() => console.log('clicked')}
		>
			Go to checkout
		</CustomButton>
	</div>
);

export default CartDropdown;
