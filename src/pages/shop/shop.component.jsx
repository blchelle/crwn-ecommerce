import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import ReactRouterPropTypes from 'react-router-prop-types';

import { connect } from 'react-redux';
import { fetchCollectionsStartAsyncAction } from '../../redux/shop/shop.actions';
import { selectIsCollectionFetching, selectShopCollections } from '../../redux/shop/shop.selectors';


import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
	componentDidMount() {
		const { fetchCollectionsStartAsync } = this.props;
		fetchCollectionsStartAsync();
	}

	render() {
		const { isCollectionFetching, match } = this.props;

		return (
			<div className="shop-page">
				<Route exact path={`${match.path}`} render={() => <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} />} />
				<Route path={`${match.path}/:collectionId`} render={() => <CollectionPageWithSpinner isLoading={isCollectionFetching} />} />
			</div>
		);
	}
}

ShopPage.defaultProps = {
	isCollectionFetching: true,
};

ShopPage.propTypes = {
	match: ReactRouterPropTypes.match.isRequired,
	isCollectionFetching: PropTypes.bool,
	fetchCollectionsStartAsync: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
	isCollectionFetching: selectIsCollectionFetching,
	collections: selectShopCollections,
});

const mapDispatchToProps = (dispatch) => ({
	fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsyncAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
