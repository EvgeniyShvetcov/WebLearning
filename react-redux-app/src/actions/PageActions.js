import {
	makeYearPhotos,
	getMorePhotos,
	photosArray,
	isCached,
} from '../utils/PhotosHelper';

export const GET_PHOTOS_REQUEST = 'GET_PHOTOS_REQUEST';
export const GET_PHOTOS_SUCCESS = 'GET_PHOTOS_SUCCESS';
export const GET_PHOTOS_FAIL = 'GET_PHOTOS_FAIL';

export function getPhotos(year) {
	return dispatch => {
		dispatch({
			type: GET_PHOTOS_REQUEST,
			payload: year,
		});

		if (isCached) {
			let photos = makeYearPhotos(photosArray, year);
			dispatch({
				type: GET_PHOTOS_SUCCESS,
				payload: photos,
			});
		} else {
			getMorePhotos(0, 200, year, dispatch);
		}
	};
}
