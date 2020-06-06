import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectShopCollectionsForPreview } from '../../redux/shop/shop.selectors';
import CollectionPreview from '../collection-preview/collection-preview.component';
import './collections-overview.styles.scss';

const CollectionsOverview = ({ collections }) => (
	<div className="collections-overview">
		{
			collections.map(({
				id, title, items, routeName,
			}) => <CollectionPreview key={id} title={title} items={items} routeName={routeName} />)
		}
	</div>
);

CollectionsOverview.propTypes = {
	collections: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			routeName: PropTypes.string.isRequired,
			items: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.number.isRequired,
					name: PropTypes.string.isRequired,
					imageUrl: PropTypes.string.isRequired,
					price: PropTypes.number.isRequired,
				}).isRequired,
			).isRequired,
		}).isRequired,
	).isRequired,
};

const mapStateToProps = createStructuredSelector({
	collections: selectShopCollectionsForPreview,
});

export default connect(mapStateToProps)(CollectionsOverview);
