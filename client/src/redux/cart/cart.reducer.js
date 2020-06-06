import CartActionTypes from './cart.types';
import { addItemToCart, decrementItemQuantity } from './cart.utils';

const INITIAL_STATE = {
	hidden: true,
	items: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
	case CartActionTypes.TOGGLE_CART_HIDDEN:
		return {
			...state,
			hidden: !state.hidden,
		};
	case CartActionTypes.ADD_ITEM:
		return {
			...state,
			items: addItemToCart(state.items, action.payload),
		};
	case CartActionTypes.DECREMENT_ITEM_QUANTITY:
		return {
			...state,
			items: decrementItemQuantity(state.items, action.payload),
		};
	case CartActionTypes.REMOVE_ITEM:
		return {
			...state,
			items: state.items.filter((item) => item.id !== action.payload.id),
		};
	case CartActionTypes.CLEAR_CART:
		return {
			...state,
			items: [],
		};
	default:
		return state;
	}
};

export default cartReducer;
