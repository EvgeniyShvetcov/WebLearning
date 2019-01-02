import React from 'react';
import PropTypes from 'prop-types';

export const Page = ({ year, photos, isFetching, error, getPhotos }) => {
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
	const renderImages = () => {
		if (error) {
			return <p>Во время загрузки фотографий произошла ошибка</p>;
		}
		if (isFetching) {
			return <p>Загрузка...</p>;
		} else {
			const photosList = photos.map(item => (
				<div key={item.id} className="photo">
					<p>
						<img src={item.sizes[1].url} alt="..." />
					</p>
					<p>{item.likes.count}❤</p>
				</div>
			));
			return <div className="photos">{photosList}</div>;
		}
	};
	return (
		<div className="ib page">
			<React.Fragment>{renderButtons()}</React.Fragment>
			{isFetching ? (
				<p>Загрузка...</p>
			) : (
				<React.Fragment>
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
};
