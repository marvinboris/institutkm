import * as actionTypes from '../actionTypes';

const prefix = '/api/';

export const resetPublications = () => ({ type: actionTypes.PUBLICATIONS_RESET });
const start = () => ({ type: actionTypes.PUBLICATIONS_START });
const success = data => ({ type: actionTypes.PUBLICATIONS_SUCCESS, ...data });
const fail = error => ({ type: actionTypes.PUBLICATIONS_FAIL, error });
export const getPublications = category => async dispatch => {
    dispatch(start());

    try {
        const lang = localStorage.getItem('frontend_lang');

        let uri;
        if (category) uri = `${prefix}publications${category ? `/${category}` : ''}`;
        else uri = `${prefix}publications`;
        const res = await fetch(`${uri}?lang=${lang}`);
        const resData = await res.json();

        dispatch(success(resData));
    } catch (error) {
        console.log(error);
        dispatch(fail(error));
    }
}

export const showPublication = (category, slug) => async dispatch => {
    dispatch(start());

    try {
        const lang = localStorage.getItem('frontend_lang');
        
        const res = await fetch(`${prefix}publications/${category}${slug ? `/${slug}` : ''}?lang=${lang}`);
        const resData = await res.json();

        dispatch(success(resData));
    } catch (error) {
        console.log(error);
        dispatch(fail(error));
    }
}