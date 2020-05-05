import CartActionTypes from './cart.types';

export const toggleCartHiddenAction = () => ({
	type: CartActionTypes.TOGGLE_CART_HIDDEN,
});

export const changeItemQuantityAction = (quantity, id) => ({
	type: CartActionTypes.CHANGE_ITEM_QUANTITY,
	payload: { quantity, id },
});

export const addItemToCartAction = (item) => ({
	type: CartActionTypes.ADD_ITEM,
	payload: item,
});

export const removeItemFromCartAction = (id) => ({
	type: CartActionTypes.REMOVE_ITEM,
	payload: { id },
});
