import UserActionTypes from './user.types';

export const setCurrentUserAction = (user) => ({
	type: UserActionTypes.SET_CURRENT_USER,
	payload: user,
});

export const googleSignInStartAction = () => ({
	type: UserActionTypes.GOOGLE_SIGN_IN_START,
});

export const googleSignInSuccessAction = (user) => ({
	type: UserActionTypes.GOOGLE_SIGN_IN_SUCCESS,
	payload: user,
});

export const googleSignInFailureAction = (error) => ({
	type: UserActionTypes.GOOGLE_SIGN_IN_FAILURE,
	payload: error,
});

export const emailSignInStartAction = (emailAndPassword) => ({
	type: UserActionTypes.EMAIL_SIGN_IN_START,
	payload: emailAndPassword,
});

export const emailSignInSuccessAction = (user) => ({
	type: UserActionTypes.EMAIL_SIGN_IN_SUCCESS,
	payload: user,
});

export const emailSignInFailureAction = (error) => ({
	type: UserActionTypes.EMAIL_SIGN_IN_FAILURE,
	payload: error,
});
