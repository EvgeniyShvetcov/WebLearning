import React from 'react';
import PropTypes from 'prop-types';

export const Page = ({ year, photos }) => {
	return (
		<React.Fragment>
			<p>
				У тебя {photos.length} фото за {year} год
			</p>
		</React.Fragment>
	);
};

Page.propTypes = {
	year: PropTypes.number.isRequired,
	photos: PropTypes.array.isRequired,
};
