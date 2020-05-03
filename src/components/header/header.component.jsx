import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { auth } from '../../firebase/firebase.utils';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import './header.styles.scss';


const Header = ({ currentUser, hidden }) => (
	<div className="header">
		<Link className="logo-container" to="/">
			<Logo className="logo" />
		</Link>
		<div className="options">
			<Link className="option" to="/shop">
				Shop
			</Link>
			<Link className="option" to="/shop">
				Contact
			</Link>
			{currentUser ? (
				<Link className="option" to="/" onClick={() => auth.signOut()}>
					Sign Out
				</Link>
			) : (
				<Link className="option" to="/authentication">
					Sign in
				</Link>
			)}
			<CartIcon />
		</div>
		{ hidden ? null
			: <CartDropdown />}
	</div>
);

Header.defaultProps = {
	currentUser: null,
	hidden: true,
};

Header.propTypes = {
	currentUser: PropTypes.shape({
		displayName: PropTypes.string,
		email: PropTypes.string,
		createdAt: PropTypes.instanceOf(Date),
	}),
	hidden: PropTypes.bool,
};

const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
	currentUser,
	hidden,
});

export default connect(mapStateToProps)(Header);
