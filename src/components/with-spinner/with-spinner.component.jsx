import React from 'react';
import PropTypes from 'prop-types';
import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

const WithSpinner = (WrappedComponent) => {
	const Spinner = ({ isLoading, isLoaded }) => {
		console.log(isLoading, isLoaded);
		return (isLoading || !isLoaded ? (
			<SpinnerOverlay>
				<SpinnerContainer />
			</SpinnerOverlay>
		) : (
			<WrappedComponent />
		));
	};

	Spinner.propTypes = {
		isLoading: PropTypes.bool.isRequired,
		isLoaded: PropTypes.bool.isRequired,
	};

	return Spinner;
};

WithSpinner.propTypes = {
	WrappedComponent: PropTypes.func.isRequired,
};

export default WithSpinner;
