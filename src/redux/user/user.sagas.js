import {
	takeLatest, put, all, call,
} from 'redux-saga/effects';
import UserActionTypes from './user.types';
import {
	googleSignInSuccessAction,
	googleSignInFailureAction,
	emailSignInSuccessAction,
	emailSignInFailureAction,
} from './user.actions';
import { auth, googleProvider, createUserProfileDocument } from '../../firebase/firebase.utils';

export function* signInWithGoogle() {
	try {
		const { user } = yield auth.signInWithPopup(googleProvider);
		const userRef = yield call(createUserProfileDocument, user);
		const userSnapshot = yield userRef.get();
		yield put(googleSignInSuccessAction({ id: userSnapshot.id, ...userSnapshot }));
	} catch (error) {
		yield put(googleSignInFailureAction(error));
	}
}

export function* signInWithEmail({ payload: { email, password } }) {
	try {
		const { user } = yield auth.signInWithEmailAndPassword(email, password);
		const userRef = yield call(createUserProfileDocument, user);
		const userSnapshot = yield userRef.get();
		yield put(emailSignInSuccessAction({ id: userSnapshot.id, ...userSnapshot }));
	} catch (error) {
		yield put(emailSignInFailureAction(error));
	}
}


export function* onEmailSignInStart() {
	yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onGoogleSignInStart() {
	yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* userSagas() {
	yield all([call(onGoogleSignInStart), call(onEmailSignInStart)]);
}
