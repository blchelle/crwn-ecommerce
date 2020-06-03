import {
	all, call, put, takeLatest,
} from 'redux-saga/effects';
import { clearCartAction } from './cart.actions';
import UserActionTypes from '../user/user.types';

export function* onSignOutSuccess() {
	yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, function* clearCartOnSignOut() {
		yield put(clearCartAction());
	});
}

export function* cartSagas() {
	yield (all([call(onSignOutSuccess)]));
}
