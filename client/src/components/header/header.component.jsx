import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { signOutStartAction } from '../../redux/user/user.actions';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import {
	HeaderContainer, LogoContainer, OptionLink, OptionsContainer,
} from './header.styles';

const Header = ({ currentUser, hidden, signOutStart }) => (
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
				<OptionLink to="/" onClick={signOutStart}>
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
	signOutStart: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	hidden: selectCartHidden,
});

const mapDispatchToProps = (dispatch) => ({
	signOutStart: () => dispatch(signOutStartAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
