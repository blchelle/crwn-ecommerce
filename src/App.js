import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from './redux/user/user.selector';
import { selectShopCollectionsForPreview } from './redux/shop/shop.selectors';
import { checkUserSessionAction } from './redux/user/user.actions';

import AuthenticationPage from './pages/authentication/authentication.component';
import Header from './components/header/header.component';
import HomePage from './pages/home/home.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';

import './App.css';

class App extends React.Component {
	constructor() {
		super();
		this.unsubscribeFromAuth = null;
	}

	componentDidMount() {
		const { checkUserSession } = this.props;
		checkUserSession();
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
					<Route path="/shop" component={ShopPage} />
					<Route exact path="/checkout" component={CheckoutPage} />
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
	checkUserSession: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	collectionsArray: selectShopCollectionsForPreview,
});

const mapDispatchToProps = (dispatch) => ({
	checkUserSession: () => dispatch(checkUserSessionAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
