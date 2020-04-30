import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';
import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

const Header = ({ isSignedIn }) => (
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
			{isSignedIn ? (
				<Link className="option" to="/" onClick={() => auth.signOut()}>
					Sign Out
				</Link>
			) : (
				<Link className="option" to="/authentication">
					Sign in
				</Link>
			)}
		</div>
	</div>
);

Header.propTypes = {
	isSignedIn: PropTypes.bool.isRequired,
};

export default Header;
