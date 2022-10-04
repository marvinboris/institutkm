import * as actionTypes from '../actionTypes';

const prefix = '/api/';

export const resetTrainings = () => ({ type: actionTypes.TRAININGS_RESET });
const start = () => ({ type: actionTypes.TRAININGS_START });
const success = data => ({ type: actionTypes.TRAININGS_SUCCESS, ...data });
const fail = error => ({ type: actionTypes.TRAININGS_FAIL, error });
export const getTrainings = category => async dispatch => {
    dispatch(start());

    try {
        const lang = localStorage.getItem('frontend_lang');

        let uri;
        if (category) uri = `${prefix}trainings${category ? `/${category}` : ''}`;
        else uri = `${prefix}trainings`;
        const res = await fetch(`${uri}?lang=${lang}`);
        const resData = await res.json();

        dispatch(success(resData));
    } catch (error) {
        console.log(error);
        dispatch(fail(error));
    }
}

export const showTraining = (category, slug) => async dispatch => {
    dispatch(start());

    try {
        const lang = localStorage.getItem('frontend_lang');
        
        const res = await fetch(`${prefix}trainings/${category}${slug ? `/${slug}` : ''}?lang=${lang}`);
        const resData = await res.json();

        dispatch(success(resData));
    } catch (error) {
        console.log(error);
        dispatch(fail(error));
    }
}

export const postPreregistration = data => async dispatch => {
    dispatch(start());

    try {
        const form = new FormData(data);
        const res = await fetch(`${prefix}preregistration?frontend_lang=${localStorage.getItem('frontend_lang')}`, {
            method: 'POST',
            body: form,
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);

        dispatch(success(resData));
    } catch (error) {
        console.log(error);
        dispatch(fail(error));
    }
}