import React from 'react';
import PropTypes from 'prop-types';

import './form-input.styles.scss';

const FormInput = ({
	handleChange, label, name, type, value, required,
}) => (
	<div className="group">
		<input
			className="form-input"
			type={type}
			name={name}
			value={value}
			onChange={handleChange}
			required={required}
		/>
		{
			label ? <label className={`${value.length > 0 ? 'shrink' : ''} form-input-label`} htmlFor={name}>{label}</label> : null
		}
	</div>
);

FormInput.defaultProps = {
	label: '',
	required: false,
};

FormInput.propTypes = {
	handleChange: PropTypes.func.isRequired,
	label: PropTypes.string,
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	required: PropTypes.bool,
};

export default FormInput;
