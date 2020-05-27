import ShopActionTypes from './shop.types';
import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchCollectionsStartAction = () => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSucceededAction = (collectionsMap) => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
	payload: collectionsMap,
});

export const fetchCollectionsFailedAction = (errorMessage) => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
	payload: errorMessage,
});


export const fetchCollectionsStartAsyncAction = () => (dispatch) => {
	const collectionRef = firestore.collection('collections');
	dispatch(fetchCollectionsStartAction());

	collectionRef.get().then((snapshot) => {
		const collectionsMap = convertCollectionSnapshotToMap(snapshot);
		dispatch(fetchCollectionsSucceededAction(collectionsMap));
	}).catch((error) => dispatch(fetchCollectionsFailedAction(error.message)));
};
