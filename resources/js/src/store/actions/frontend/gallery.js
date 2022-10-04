import * as actionTypes from '../actionTypes';

const prefix = '/api/';

export const resetGallery = () => ({ type: actionTypes.GALLERY_RESET });
const galleryStart = () => ({ type: actionTypes.GALLERY_START });
const gallerySuccess = data => ({ type: actionTypes.GALLERY_SUCCESS, ...data });
const galleryFail = error => ({ type: actionTypes.GALLERY_FAIL, error });
export const getGallery = () => async dispatch => {
    dispatch(galleryStart());

    try {
        const res = await fetch(`${prefix}gallery`);
        const resData = await res.json();

        dispatch(gallerySuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(galleryFail(error));
    }
}