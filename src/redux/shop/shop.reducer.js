import ShopActionTypes from './shop.types';

const INITIAL_STATE = {
	collections: null,
	isFetching: false,
	isLoaded: false,
	errorMessage: undefined,
};

const shopReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
	case ShopActionTypes.FETCH_COLLECTIONS_START:
		return {
			...state,
			isFetching: true,
			isLoaded: false,
		};
	case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS:
		return {
			...state,
			isFetching: false,
			isLoaded: true,
			collections: action.payload,
		};
	case ShopActionTypes.FETCH_COLLECTIONS_FAILURE:
		return {
			...state,
			isFetching: false,
			isLoaded: false,
			errorMessage: action.payload,
		};
	default:
		return state;
	}
};

export default shopReducer;
