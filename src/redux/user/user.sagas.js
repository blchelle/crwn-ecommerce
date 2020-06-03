import {
	takeLatest, put, all, call,
} from 'redux-saga/effects';
import UserActionTypes from './user.types';
import {
	signInFailureAction, signInSuccessAction, signOutSuccessAction, signOutFailureAction, signUpSuccessAction, signUpFailureAction,
} from './user.actions';
import {
	auth, googleProvider, createUserProfileDocument, getCurrentUser,
} from '../../firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
	try {
		const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
		const userSnapshot = yield userRef.get();
		yield put(signInSuccessAction({ id: userSnapshot.id, ...userSnapshot }));
	} catch (error) {
		yield put(signInFailureAction(error));
	}
}

export function* signInWithGoogle() {
	try {
		const { user } = yield auth.signInWithPopup(googleProvider);
		yield (getSnapshotFromUserAuth(user));
	} catch (error) {
		yield put(signInFailureAction(error));
	}
}

export function* signInWithEmail({ payload: { email, password } }) {
	try {
		const { user } = yield auth.signInWithEmailAndPassword(email, password);
		yield getSnapshotFromUserAuth(user);
	} catch (error) {
		yield put(signInFailureAction(error));
	}
}

export function* isUserAuthenticated() {
	try {
		const user = yield getCurrentUser();
		if (!user) return;
		yield getSnapshotFromUserAuth(user);
	} catch (error) {
		yield put(signInFailureAction(error));
	}
}

export function* signOut() {
	try {
		yield auth.signOut();
		yield put(signOutSuccessAction());
	} catch (error) {
		yield put(signOutFailureAction(error));
	}
}

export function* signUp({ payload: { displayName, email, password } }) {
	try {
		const { user } = yield auth.createUserWithEmailAndPassword(email, password);
		yield put(signUpSuccessAction({ user, additionalData: { displayName } }));
	} catch (error) {
		yield put(signUpFailureAction(error));
	}
}

export function* onGoogleSignInStart() {
	yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
	yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
	yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
	yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
	yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
	yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS,
		function* signInAfterSignUp({ payload: { user, additionalData } }) {
			yield getSnapshotFromUserAuth(user, additionalData);
		});
}

export function* userSagas() {
	yield all(
		[call(onGoogleSignInStart),
			call(onEmailSignInStart),
			call(onCheckUserSession),
			call(onSignOutStart),
			call(onSignUpStart),
			call(onSignUpSuccess),
		],
	);
}
