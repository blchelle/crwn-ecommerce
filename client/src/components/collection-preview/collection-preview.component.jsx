import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import CollectionItem from '../collection-item/collection-item.component';
import './collection-preview.styles.scss';


const CollectionPreview = ({ match, title, items }) => (
	<div className="collection-preview">
		<Link className="title" to={`${match.url}/${title.toLowerCase()}`}>
			{title}
		</Link>
		<div className="preview">
			{items.filter((item, index) => index < 4)
				.map((item) => (<CollectionItem key={item.id} item={item} />))}
		</div>
	</div>
);

CollectionPreview.propTypes = {
	match: ReactRouterPropTypes.match.isRequired,
	title: PropTypes.string.isRequired,
	items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withRouter(CollectionPreview);
