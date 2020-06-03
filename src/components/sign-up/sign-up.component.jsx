import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signUpStartAction } from '../../redux/user/user.actions';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './sign-up.styles.scss';

const SignUp = ({ signUpStart }) => {
	const [displayName, setDisplayName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			alert('passwords do not match');
		}

		signUpStart({ displayName, email, password });
	};

	const handleChange = async (event, setFn) => {
		const { value } = event.target;
		setFn(value);
	};

	return (
		<div className="sign-up">
			<h2 className="title">I do not have an account</h2>
			<span>Sign up with your email and password</span>
			<form className="sign-up-form" onSubmit={handleSubmit}>
				<FormInput
					type="text"
					name="displayName"
					value={displayName}
					handleChange={(e) => handleChange(e, setDisplayName)}
					label="Display Name"
					required
				/>
				<FormInput
					type="email"
					name="email"
					value={email}
					handleChange={(e) => handleChange(e, setEmail)}
					label="Email"
					required
				/>
				<FormInput
					type="password"
					name="password"
					value={password}
					handleChange={(e) => handleChange(e, setPassword)}
					label="Password"
					required
				/>
				<FormInput
					type="password"
					name="confirmPassword"
					value={confirmPassword}
					handleChange={(e) => handleChange(e, setConfirmPassword)}
					label="Confirm Password"
					required
				/>
				<CustomButton type="submit" handleClick={handleSubmit}>Sign Up</CustomButton>
			</form>
		</div>
	);
};


SignUp.propTypes = {
	signUpStart: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
	signUpStart: (userCredentials) => dispatch(signUpStartAction(userCredentials)),
});


export default connect(null, mapDispatchToProps)(SignUp);
