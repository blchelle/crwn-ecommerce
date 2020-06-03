import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signUpStartAction } from '../../redux/user/user.actions';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './sign-up.styles.scss';

class SignUp extends React.Component {
	constructor() {
		super();

		this.state = {
			displayName: '',
			email: '',
			password: '',
			confirmPassword: '',
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	async handleSubmit(event) {
		event.preventDefault();

		const {
			displayName, email, password, confirmPassword,
		} = this.state;

		if (password !== confirmPassword) {
			alert('passwords do not match');
		}

		const { signUpStart } = this.props;
		signUpStart({ displayName, email, password });
	}

	handleChange(event) {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	}

	render() {
		const {
			displayName, email, password, confirmPassword,
		} = this.state;

		return (
			<div className="sign-up">
				<h2 className="title">I do not have an account</h2>
				<span>Sign up with your email and password</span>
				<form className="sign-up-form" onSubmit={this.handleSubmit}>
					<FormInput type="text" name="displayName" value={displayName} handleChange={this.handleChange} label="Display Name" required />
					<FormInput type="email" name="email" value={email} handleChange={this.handleChange} label="Email" required />
					<FormInput type="password" name="password" value={password} handleChange={this.handleChange} label="Password" required />
					<FormInput type="password" name="confirmPassword" value={confirmPassword} handleChange={this.handleChange} label="Confirm Password" required />
					<CustomButton type="submit" handleClick={this.handleSubmit}>Sign Up</CustomButton>
				</form>
			</div>
		);
	}
}

SignUp.propTypes = {
	signUpStart: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
	signUpStart: (userCredentials) => dispatch(signUpStartAction(userCredentials)),
});


export default connect(null, mapDispatchToProps)(SignUp);
