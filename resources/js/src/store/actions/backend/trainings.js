import { manageResource } from '../../../shared/utility';
import * as actionTypes from '../actionTypes';

const resource = (type, ...params) => manageResource('trainings', {
    start: () => ({ type: actionTypes.TRAININGS_START }),
    success: data => ({ type: actionTypes.TRAININGS_SUCCESS, ...data }),
    fail: error => ({ type: actionTypes.TRAININGS_FAIL, error })
}, type, ...params);

export default {
    reset: () => ({ type: actionTypes.TRAININGS_RESET }),
    get: (page, show, search) => resource('index', page, show, search),
    info: () => resource('info'),
    show: id => resource('show', id),
    post: data => resource('post', data),
    patch: (id, data) => resource('patch', id, data),
    delete: id => resource('delete', id),
}