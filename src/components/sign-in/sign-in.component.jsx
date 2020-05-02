import React from 'react';
import { auth, signInWithGoogle, createUserProfileDocument } from '../../firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

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

		try {
			await auth.signInWithEmailAndPassword(email, password);
			this.setState({ email: '', password: '' });
		} catch (error) {
			alert(error);
		}
	}

	handleChange(event) {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	}

	render() {
		const { email, password } = this.state;

		return (
			<div className="sign-in">
				<h2 className="title">I already have an account</h2>
				<span>Sign in with your email and password</span>

				<form onSubmit={this.handleSubmit}>
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
						<CustomButton handleClick={signInWithGoogle} type="button" isGoogleSignIn>
							Sign in with google
						</CustomButton>
					</div>
				</form>
			</div>
		);
	}
}

export default SignIn;
