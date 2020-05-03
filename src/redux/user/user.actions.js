import UserActionTypes from './user.types';

const setCurrentUserAction = (user) => ({
	type: UserActionTypes.SET_CURRENT_USER,
	payload: user,
});

export default setCurrentUserAction;
