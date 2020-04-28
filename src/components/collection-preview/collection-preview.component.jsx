import React from 'react';
import PropTypes from 'prop-types';
import CollectionItem from '../collection-item/collection-item.component';
import './collection-preview.styles.scss';

const CollectionPreview = ({ title, items }) => (
	<div className="collection-preview">
		<h1 className="title">
			{title}
		</h1>
		<div className="preview">
			{items.filter((item, index) => index < 4)
				.map(({
					id, name, price, imageUrl,
				}) => (<CollectionItem key={id} name={name} price={price} imageUrl={imageUrl} />))}
		</div>
	</div>
);

CollectionPreview.propTypes = {
	title: PropTypes.string.isRequired,
	items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CollectionPreview;
