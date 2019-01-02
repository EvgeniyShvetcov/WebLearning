import { GET_PHOTOS_FAIL, GET_PHOTOS_SUCCESS } from '../actions/PageActions';

export const photosArray = [];
export let isCached = false;

export const getMorePhotos = (offset = 0, count = 200, year, dispatch) => {
	/* global VK */
	VK.Api.call(
		'photos.getAll',
		{
			extended: 1,
			count: count,
			offset: offset,
			photo_sizes: 0,
			v: '5.77',
		},
		data => {
			try {
				if (data.response) {
					photosArray.push(...data.response.items);
					let allPhotosCount = data.response.count;
					//If we don't get all photos do it again
					if (allPhotosCount > 200 && offset <= allPhotosCount) {
						offset += 200;
						getMorePhotos(offset, count, year, dispatch);
					} else {
						let photos = makeYearPhotos(photosArray, year);
						if (photosArray.length > 0) isCached = true;
						dispatch({
							type: GET_PHOTOS_SUCCESS,
							payload: photos,
						});
					}
				} else {
					dispatch({
						type: GET_PHOTOS_FAIL,
						error: true,
						payload: new Error('Ошибка при загрузке фотографий'),
					});
				}
			} catch (e) {
				dispatch({
					type: GET_PHOTOS_FAIL,
					error: true,
					payload: new Error(e),
				});
			}
		}
	);
};

export const makeYearPhotos = (photosArray, year) => {
	//filter received photos array by selected year
	let yearPhotos = photosArray.filter(item => {
		let createPhotoDate = new Date(item.date * 1000).getFullYear();
		return createPhotoDate === year;
	});

	//sort by descending of photos likes
	yearPhotos.sort((a, b) => {
		return b.likes.count - a.likes.count;
	});

	return yearPhotos;
};
