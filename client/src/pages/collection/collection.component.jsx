import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { firestore } from '../../firebase/firebase.utils';
import { selectShopCollection } from '../../redux/shop/shop.selectors';
import CollectionItem from '../../components/collection-item/collection-item.component';
import './collection.styles.scss';

const CollectionPage = ({ collection, match }) => {
	useEffect(() => {
		const unsubscribeFromCollections = firestore.collection('collections').onSnapshot((snapshot) => console.log(snapshot));
		return () => {
			unsubscribeFromCollections();
		};
	}, []);

	return (
		<div className="collection">
			<h2 className="title">{match.params.collectionId}</h2>
			{
				collection.items.map((item) => <CollectionItem key={item.id} item={item} />)
			}
		</div>
	);
};


CollectionPage.propTypes = {
	collection: PropTypes.shape({
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
		),
	}).isRequired,
	match: ReactRouterPropTypes.match.isRequired,
};

const mapStateToProps = (state, { match: { params: { collectionId } } }) => ({
	collection: selectShopCollection(collectionId)(state),
});

export default withRouter(connect(mapStateToProps)(CollectionPage));
