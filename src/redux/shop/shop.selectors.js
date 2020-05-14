import { createSelector } from 'reselect';

const selectShop = (state) => state.shop;

export const selectShopCollections = createSelector(
	[selectShop],
	(shop) => shop.collections,
);

export const selectShopCollectionsForPreview = createSelector(
	[selectShopCollections],
	(collections) => Object.values(collections),
);

export const selectShopCollection = (collectionType) => (
	createSelector(
		[selectShopCollections],
		(collections) => collections[collectionType],
	)
);
