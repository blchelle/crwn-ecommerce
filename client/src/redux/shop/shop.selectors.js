import { createSelector } from 'reselect';

const selectShop = (state) => state.shop;

export const selectShopCollections = createSelector(
	[selectShop],
	(shop) => shop.collections,
);

export const selectShopCollectionsForPreview = createSelector(
	[selectShopCollections],
	(collections) => (collections ? Object.values(collections) : []),
);

export const selectShopCollection = (collectionType) => (
	createSelector(
		[selectShopCollections],
		(collections) => (collections ? collections[collectionType] : null),
	)
);

export const selectIsCollectionFetching = createSelector(
	[selectShop],
	(shop) => shop.isFetching,
);

export const selectIsCollectionLoaded = createSelector(
	[selectShop],
	(shop) => shop.isLoaded,
);
