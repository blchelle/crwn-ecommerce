import React from 'react';
import PropTypes from 'prop-types';
import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

const WithSpinner = (WrappedComponent) => {
	const Spinner = ({ isLoading, ...otherProps }) => (isLoading ? (
		<SpinnerOverlay>
			<SpinnerContainer />
		</SpinnerOverlay>
	) : (
		<WrappedComponent {...otherProps} />
	));

	return Spinner;
};

WithSpinner.defaultProps = {
	isLoading: false,
};

WithSpinner.propTypes = {
	isLoading: PropTypes.bool,
};

export default WithSpinner;
