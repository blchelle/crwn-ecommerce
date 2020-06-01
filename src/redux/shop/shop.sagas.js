import { takeLatest, call, put } from 'redux-saga/effects';
import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';
import { fetchCollectionsSucceededAction, fetchCollectionsFailedAction } from './shop.actions';
import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {
	try {
		const collectionRef = firestore.collection('collections');
		const snapshot = yield collectionRef.get();
		const collectionsMap = yield call(convertCollectionSnapshotToMap, snapshot);
		yield put(fetchCollectionsSucceededAction(collectionsMap));
	} catch (error) {
		yield put(fetchCollectionsFailedAction(error.message));
	}

	// collectionRef.get().then((snapshot) => {
	// 	const collectionsMap = convertCollectionSnapshotToMap(snapshot);
	// 	dispatch(fetchCollectionsSucceededAction(collectionsMap));
	// }).catch((error) => dispatch(fetchCollectionsFailedAction(error.message)));
}

export function* fetchCollectionsStart() {
	yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}
