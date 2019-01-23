import React from 'react';
import PropTypes from 'prop-types';
import { getLastYears, LAST_FIVE_YEARS } from '../utils/DateHelper';

export const Page = ({
	year,
	photos,
	isFetching,
	isAuthorized,
	error,
	getPhotos,
}) => {
	const onButtonClick = event => {
		const year = +event.currentTarget.innerText;
		getPhotos(year);
	};

	const renderButtons = () => {
		const years = getLastYears(LAST_FIVE_YEARS);
		return years.map((item, index) => {
			return (
				<button key={index} className="btn" onClick={onButtonClick}>
					{item}
				</button>
			);
		});
	};
	const renderImages = () => {
		if (error) {
			return <p>Во время загрузки фотографий произошла ошибка</p>;
		}
		if (isFetching) {
			return <p>Загрузка...</p>;
		} else {
			const photosList = photos.map(item => (
				<div key={item.id} className="photo">
					<img src={item.sizes[2].url} alt="..." />
					<div>{item.likes.count}❤</div>
				</div>
			));
			return <div className="photos">{photosList}</div>;
		}
	};
	return (
		<div className="ib page">
			{isAuthorized && (
				<React.Fragment>
					{renderButtons()}
					<h3>
						{year} год [{photos.length}]
					</h3>
					{renderImages()}
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
	isAuthorized: PropTypes.bool.isRequired,
};
