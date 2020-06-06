import UserActionTypes from './user.types';

export const setCurrentUserAction = (user) => ({
	type: UserActionTypes.SET_CURRENT_USER,
	payload: user,
});

export const googleSignInStartAction = () => ({
	type: UserActionTypes.GOOGLE_SIGN_IN_START,
});

export const emailSignInStartAction = (emailAndPassword) => ({
	type: UserActionTypes.EMAIL_SIGN_IN_START,
	payload: emailAndPassword,
});

export const signInSuccessAction = (user) => ({
	type: UserActionTypes.SIGN_IN_SUCCESS,
	payload: user,
});

export const signInFailureAction = (error) => ({
	type: UserActionTypes.SIGN_IN_FAILURE,
	payload: error,
});

export const checkUserSessionAction = () => ({
	type: UserActionTypes.CHECK_USER_SESSION,
});

export const signOutStartAction = () => ({
	type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccessAction = () => ({
	type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailureAction = (error) => ({
	type: UserActionTypes.SIGN_OUT_FAILURE,
	payload: error,
});

export const signUpStartAction = (userCredentials) => ({
	type: UserActionTypes.SIGN_UP_START,
	payload: userCredentials,
});

export const signUpSuccessAction = ({ user, additionalData }) => ({
	type: UserActionTypes.SIGN_UP_SUCCESS,
	payload: { user, additionalData },
});

export const signUpFailureAction = (error) => ({
	type: UserActionTypes.SIGN_UP_FAILURE,
	payload: error,
});
