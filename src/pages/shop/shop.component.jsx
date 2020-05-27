import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import { connect } from 'react-redux';
import { updateCollectionsAction } from '../../redux/shop/shop.actions';
import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';

import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
	constructor() {
		super();

		this.state = {
			isLoading: true,
		};

		this.unsubscribeFromSnapshot = null;
	}

	async componentDidMount() {
		const { updateCollections } = this.props;
		const collectionRef = firestore.collection('collections');

		fetch('https://firestore.googleapis.com/v1/projects/crwn-ecommerce-ba12d/databases/(default)/documents')
			.then((res) => res.json())
			.then((collections) => console.log(collections));
		// collectionRef.get().then((snapshot) => {
		// 	const collectionsMap = convertCollectionSnapshotToMap(snapshot);
		// 	updateCollections(collectionsMap);
		// 	this.setState({ isLoading: false });
		// });
	}

	componentWillUnmount() {

	}

	render() {
		const { isLoading } = this.state;
		const { match } = this.props;
		return (
			<div className="shop-page">
				<Route exact path={`${match.path}`} render={() => <CollectionsOverviewWithSpinner isLoading={isLoading} />} />
				<Route path={`${match.path}/:collectionId`} render={() => <CollectionPageWithSpinner isLoading={isLoading} />} />
			</div>
		);
	}
}

ShopPage.propTypes = {
	match: ReactRouterPropTypes.match.isRequired,
	updateCollections: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
	updateCollections: (collectionsMap) => dispatch(updateCollectionsAction(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
