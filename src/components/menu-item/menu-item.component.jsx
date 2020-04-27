import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import './menu-item.styles.scss';

const MenuItem = ({
	title, imageUrl, size, linkUrl, match,
}) => (
	<Link className={`${size} menu-item`} to={`${match.url}${linkUrl}`}>
		<div className="background-image" style={{ backgroundImage: `url(${imageUrl})` }} />
		<div className="content">
			<h1 className="title">{title}</h1>
			<span className="subtitle">SHOP NOW</span>
		</div>
	</Link>
);

MenuItem.defaultProps = {
	size: '',
};

MenuItem.propTypes = {
	title: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	size: PropTypes.string,
	linkUrl: PropTypes.string.isRequired,
	match: ReactRouterPropTypes.match.isRequired,
};

export default withRouter(MenuItem);
