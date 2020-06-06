import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsCollectionFetching, selectIsCollectionLoaded } from '../../redux/shop/shop.selectors';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import Collection from './collection.component';

const mapStateToProps = createStructuredSelector({
	isLoading: selectIsCollectionFetching,
	isLoaded: selectIsCollectionLoaded,
});

const CollectionsOverviewContainer = compose(
	connect(mapStateToProps), WithSpinner,
)(Collection);

export default CollectionsOverviewContainer;
