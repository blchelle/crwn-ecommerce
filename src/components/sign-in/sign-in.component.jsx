import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { googleSignInStartAction, emailSignInStartAction } from '../../redux/user/user.actions';

import './sign-in.styles.scss';

class SignIn extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async handleSubmit(event) {
		event.preventDefault();
		const { email, password } = this.state;
		const { emailSignInStart } = this.props;

		emailSignInStart(email, password);
	}

	handleChange(event) {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	}

	render() {
		const { email, password } = this.state;
		const { googleSignInStart } = this.props;

		return (
			<div className="sign-in">
				<h2 className="title">I already have an account</h2>
				<span>Sign in with your email and password</span>

				<form className="sign-in-form" onSubmit={this.handleSubmit}>
					<FormInput
						label="email"
						handleChange={this.handleChange}
						name="email"
						type="email"
						value={email}
						required
					/>
					<FormInput
						handleChange={this.handleChange}
						label="password"
						name="password"
						type="password"
						value={password}
						required
					/>
					<div className="buttons">
						<CustomButton handleClick={this.handleSubmit} type="submit">
							Sign in
						</CustomButton>
						<CustomButton handleClick={googleSignInStart} type="button" isGoogleSignIn>
							Sign in with google
						</CustomButton>
					</div>
				</form>
			</div>
		);
	}
}

SignIn.propTypes = {
	googleSignInStart: PropTypes.func.isRequired,
	emailSignInStart: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
	googleSignInStart: () => dispatch(googleSignInStartAction()),
	emailSignInStart: (email, password) => dispatch(emailSignInStartAction({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
