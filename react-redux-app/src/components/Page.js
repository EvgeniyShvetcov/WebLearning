import React from 'react';
import PropTypes from 'prop-types';

export const Page = ({ year, photos, isFetching, getPhotos }) => {
	const onButtonClick = event => {
		const year = +event.currentTarget.innerText;
		getPhotos(year);
	};

	const renderButtons = () => {
		const years = [2018, 2017, 2016, 2015, 2014];
		return years.map((item, index) => {
			return (
				<button key={index} className="btn" onClick={onButtonClick}>
					{item}
				</button>
			);
		});
	};

	return (
		<div className="ib page">
			<React.Fragment>{renderButtons()}</React.Fragment>
			{isFetching ? (
				<p>Загрузка...</p>
			) : (
				<React.Fragment>
					<h3>{year} год</h3>
					<p>У тебя {photos.length} фото</p>
				</React.Fragment>
			)}
		</div>
	);
};

Page.propTypes = {
	year: PropTypes.number.isRequired,
	photos: PropTypes.array.isRequired,
	getPhotos: PropTypes.func.isRequired,
	isFetching: PropTypes.bool.isRequired,
};
