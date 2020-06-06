/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import './custom-button.styles.scss';

const CustomButton = ({
	children, isGoogleSignIn, inverted, type, handleClick,
}) => (
	<button
		className={`custom-button ${inverted ? 'inverted' : ''} ${isGoogleSignIn ? 'google-sign-in' : ''}`}
		type={type}
		onClick={handleClick}
	>
		{children}
	</button>
);

CustomButton.defaultProps = {
	isGoogleSignIn: false,
};

CustomButton.propTypes = {
	children: PropTypes.string.isRequired,
	isGoogleSignIn: PropTypes.bool,
	type: PropTypes.string.isRequired,
	handleClick: PropTypes.func.isRequired,
};

export default CustomButton;
