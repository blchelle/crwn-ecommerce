import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { auth } from '../../firebase/firebase.utils';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import {
	HeaderContainer, LogoContainer, OptionDiv, OptionLink, OptionsContainer,
} from './header.styles';

const Header = ({ currentUser, hidden }) => (
	<HeaderContainer>
		<LogoContainer to="/">
			<Logo className="logo" />
		</LogoContainer>
		<OptionsContainer>
			<OptionLink to="/shop">
				Shop
			</OptionLink>
			<OptionLink to="/shop">
				Contact
			</OptionLink>
			{currentUser ? (
				<OptionLink to="/" onClick={() => auth.signOut()}>
					Sign Out
				</OptionLink>
			) : (
				<OptionLink to="/authentication">
					Sign in
				</OptionLink>
			)}
			<CartIcon />
		</OptionsContainer>
		{ hidden ? null
			: <CartDropdown />}
	</HeaderContainer>
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

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	hidden: selectCartHidden,
});

export default connect(mapStateToProps)(Header);
