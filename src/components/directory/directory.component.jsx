import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectDirectorySections } from '../../redux/directory/directory.selectors';
import MenuItem from '../menu-item/menu-item.component';
import './directory.styles.scss';

const Directory = ({ sections }) => (
	<div className="directory-menu">
		{
			sections.map(({
				title, imageUrl, id, size, linkUrl,
			}) => (
				<MenuItem
					key={id}
					title={title}
					imageUrl={imageUrl}
					size={size}
					linkUrl={linkUrl}
				/>
			))
		}
	</div>
);

Directory.propTypes = {
	sections: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string.isRequired,
		imageUrl: PropTypes.string.isRequired,
		size: PropTypes.string,
		linkUrl: PropTypes.string.isRequired,
	}).isRequired).isRequired,
};

const mapStateToProps = () => createStructuredSelector({
	sections: selectDirectorySections,
});

export default connect(mapStateToProps)(Directory);
