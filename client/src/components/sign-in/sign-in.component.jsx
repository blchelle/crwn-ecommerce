import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { googleSignInStartAction, emailSignInStartAction } from '../../redux/user/user.actions';
import './sign-in.styles.scss';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();
		emailSignInStart(email, password);
	};

	const handleChange = async (event, setFn) => {
		const { value } = event.target;
		setFn(value);
	};

	return (
		<div className="sign-in">
			<h2 className="title">I already have an account</h2>
			<span>Sign in with your email and password</span>

			<form className="sign-in-form" onSubmit={handleSubmit}>
				<FormInput
					label="email"
					handleChange={(e) => handleChange(e, setEmail)}
					name="email"
					type="email"
					value={email}
					required
				/>
				<FormInput
					handleChange={(e) => handleChange(e, setPassword)}
					label="password"
					name="password"
					type="password"
					value={password}
					required
				/>
				<div className="buttons">
					<CustomButton handleClick={handleSubmit} type="submit">
						Sign in
					</CustomButton>
					<CustomButton handleClick={googleSignInStart} type="button" isGoogleSignIn>
						Sign in with google
					</CustomButton>
				</div>
			</form>
		</div>
	);
};

SignIn.propTypes = {
	googleSignInStart: PropTypes.func.isRequired,
	emailSignInStart: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
	googleSignInStart: () => dispatch(googleSignInStartAction()),
	emailSignInStart: (email, password) => dispatch(emailSignInStartAction({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
