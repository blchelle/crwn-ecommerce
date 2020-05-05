/**
 * Insert a new item into the cart, if that item already exists in the cart
 * then simply increase the quantity of that item.
 * @param {object[]} existingItems All the items currently in the cart
 * @param {object} newItem The new item to add to the cart
 */
export const addItemToCart = (existingItems, newItem) => {
	// Find the item in the cart that is the same as the new item
	const existingCartItem = existingItems.find((item) => item.id === newItem.id);

	// If an item is found then return the same cart with that one items quantity incremented
	if (existingCartItem) {
		return existingItems.map((item) => {
			if (item.id === existingCartItem.id) {
				return { ...item, quantity: item.quantity + 1 };
			}

			return item;
		});
	}

	// Otherwise return the same cart with the new item added onto the back
	return [...existingItems, { ...newItem, quantity: 1 }];
};

/**
 * Upadates the quantity of a specified cart item
 * @param {object} existingItems All the items currently in the cart
 * @param {number} quantity The new quantity of the item with 'id'
 * @param {number} id The id of the item whose quantity we are changing
 */
export const changeItemQuantity = (existingItems, quantity, id) => (
	// Find the matching item
	existingItems.map((item) => {
		if (item.id === id && quantity > 0) {
			return { ...item, quantity };
		}

		return item;
	})
);
