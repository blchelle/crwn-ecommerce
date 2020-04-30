import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { auth } from './firebase/firebase.utils';

import Header from './components/header/header.component';
import HomePage from './pages/home/home.component';
import ShopPage from './pages/shop/shop.component';
import AuthenticatonPage from './pages/authentication/authentication.component';
import './App.css';

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			currentUser: null,
		};

		this.unsubscribeFromAuth = null;
	}

	componentDidMount() {
		this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
			this.setState({ currentUser: user });
		});
	}

	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		const { currentUser } = this.state;

		return (
			<div>
				<Header isSignedIn={currentUser !== null} />
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/shop" component={ShopPage} />
					<Route exact path="/authentication" component={AuthenticatonPage} />
				</Switch>
			</div>
		);
	}
}

export default App;
