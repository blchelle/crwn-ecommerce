import { createSelector } from 'reselect';

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector([selectCart], (cart) => cart.items);

export const selectCartItemsCount = createSelector(
	[selectCartItems],
	(items) => items.reduce((count, item) => count + item.quantity, 0),
);

export const selectCartHidden = createSelector(
	[selectCart],
	(cart) => cart.hidden,
);

export const selectCartTotal = createSelector(
	[selectCart],
	({ items }) => items.reduce((total, { quantity, price }) => total + quantity * price, 0),
);
