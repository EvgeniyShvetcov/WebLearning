import React from 'react';
import PropTypes from 'prop-types';

export const Page = ({ year, photos, isFetching, getPhotos }) => {
	const onButtonClick = event => {
		const year = +event.currentTarget.innerText;
		getPhotos(year);
	};
	return (
		<div className="ib page">
			<React.Fragment>
				<button className="btn" onClick={onButtonClick}>
					2018
				</button>{' '}
				<button className="btn" onClick={onButtonClick}>
					2017
				</button>{' '}
				<button className="btn" onClick={onButtonClick}>
					2016
				</button>{' '}
				<button className="btn" onClick={onButtonClick}>
					2015
				</button>{' '}
				<button className="btn" onClick={onButtonClick}>
					2014
				</button>
			</React.Fragment>
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
