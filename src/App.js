import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import setCurrentUserAction from './redux/user/user.actions';

import Header from './components/header/header.component';
import HomePage from './pages/home/home.component';
import ShopPage from './pages/shop/shop.component';
import AuthenticationPage from './pages/authentication/authentication.component';

import './App.css';

class App extends React.Component {
	constructor() {
		super();
		this.unsubscribeFromAuth = null;
	}

	componentDidMount() {
		const { setCurrentUser } = this.props;

		this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				userRef.onSnapshot((snapshot) => {
					const data = snapshot.data();
					const { displayName, email, createdAt } = data;

					setCurrentUser({
						id: snapshot.id,
						createdAt: createdAt.toDate(),
						displayName,
						email,
					});
				});
			} else {
				setCurrentUser(null);
			}
		});
	}

	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		const { currentUser } = this.props;

		return (
			<div>
				<Header />
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/shop" component={ShopPage} />
					<Route
						exact
						path="/authentication"
						render={() => (currentUser ? <Redirect to="/" /> : <AuthenticationPage />)}
					/>
				</Switch>
			</div>
		);
	}
}

App.defaultProps = {
	currentUser: null,
};

App.propTypes = {
	currentUser: PropTypes.shape({
		displayName: PropTypes.string,
		email: PropTypes.string,
		createdAt: PropTypes.instanceOf(Date),
	}),
	setCurrentUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ user }) => ({
	currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUserAction(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
