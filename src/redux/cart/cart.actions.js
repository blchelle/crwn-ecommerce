import CartActionTypes from './cart.types';

export const toggleCartHiddenAction = () => ({
	type: CartActionTypes.TOGGLE_CART_HIDDEN,
});

export const decrementItemQuantityAction = (item) => ({
	type: CartActionTypes.DECREMENT_ITEM_QUANTITY,
	payload: item,
});

export const addItemToCartAction = (item) => ({
	type: CartActionTypes.ADD_ITEM,
	payload: item,
});

export const removeItemFromCartAction = (item) => ({
	type: CartActionTypes.REMOVE_ITEM,
	payload: item,
});
