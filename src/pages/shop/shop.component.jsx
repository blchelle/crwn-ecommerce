import React from 'react';
import { Route } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

import { connect } from 'react-redux';
import { updateCollectionsAction } from '../../redux/shop/shop.actions';
import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

class ShopPage extends React.Component {
	constructor() {
		super();
		this.unsubscribeFromSnapshot = null;
	}

	componentDidMount() {
		const { updateCollections } = this.props;
		const collectionRef = firestore.collection('collections');
		collectionRef.onSnapshot(async (snapshot) => {
			const collectionsMap = convertCollectionSnapshotToMap(snapshot);
			updateCollections(collectionsMap);
		});
	}

	componentWillUnmount() {

	}

	render() {
		const { match } = this.props;
		return (
			<div className="shop-page">
				<Route exact path={`${match.path}`} component={CollectionsOverview} />
				<Route path={`${match.path}/:collectionId`} component={CollectionPage} />
			</div>
		);
	}
}

ShopPage.propTypes = {
	match: ReactRouterPropTypes.match.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
	updateCollections: (collectionsMap) => dispatch(updateCollectionsAction(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
