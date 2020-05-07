import React from 'react';
import { Route } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

const ShopPage = ({ match }) => (
	<div className="shop-page">
		<Route exact path={`${match.path}`} component={CollectionsOverview} />
		<Route path={`${match.path}/:collectionId`} component={CollectionPage} />
	</div>
);

ShopPage.propTypes = {
	match: ReactRouterPropTypes.match.isRequired,
};


export default ShopPage;
