import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addItemToCartAction } from '../../redux/cart/cart.actions';
import CustomButton from '../custom-button/custom-button.component';
import './collection-item.styles.scss';

const CollectionItem = ({ item, addItemToCart }) => {
	const { name, price, imageUrl } = item;

	return (
		<div className="collection-item">
			<div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
			<div className="collection-footer">
				<span className="name">{name}</span>
				<span className="price">{price}</span>
			</div>
			<CustomButton handleClick={() => addItemToCart(item)} inverted>Add to cart</CustomButton>
		</div>
	);
};

CollectionItem.propTypes = {
	item: PropTypes.shape({
		name: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		imageUrl: PropTypes.string.isRequired,
	}).isRequired,
	addItemToCart: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
	addItemToCart: (item) => dispatch(addItemToCartAction(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
