import { browserHistory } from 'react-router';

import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGOUT_USER,
    REGISTER_USER_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    TOURS_SUCCESS,
    TOUR_SUCCESS,
    PROFILE_SUCCESS,
    COMMENT_SUCCESS,
} from '../constants/index';

import { parseJSON } from '../utils/misc';
import { get_token, create_user, get_tours, get_tour, get_comment } from '../utils/http_functions';


export function loginUserSuccess(response) {
    localStorage.setItem('token', response['token']);
    localStorage.setItem('user', response['user']);
    var token = response['token'];
    var user = response['user'];
    return {
        type: LOGIN_USER_SUCCESS,
        payload: {
          token,
          user,
        },
    };
}


export function loginUserFailure(error) {
    localStorage.removeItem('token');
    return {
        type: LOGIN_USER_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText,
        },
    };
}

export function loginUserRequest() {
    return {
        type: LOGIN_USER_REQUEST,
    };
}

export function logout() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT_USER,
    };
}

export function logoutAndRedirect() {
    return (dispatch) => {
        dispatch(logout());
        browserHistory.push('/');
    };
}

export function redirectToRoute(route) {
    return () => {
        browserHistory.push(route);
    };
}

export function loginUser(email, password) {
    return function (dispatch) {
        dispatch(loginUserRequest());
        return get_token(email, password)
            .then(parseJSON)
            .then(response => {
                try {
                    dispatch(loginUserSuccess(response));
                    browserHistory.push('/main');
                } catch (e) {
                    alert(e);
                    dispatch(loginUserFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token',
                        },
                    }));
                }
            })
            .catch(error => {
                dispatch(loginUserFailure({
                    response: {
                        status: 403,
                        statusText: 'Invalid username or password',
                    },
                }));
            });
    };
}

export function registerUserRequest() {
    return {
        type: REGISTER_USER_REQUEST,
    };
}

export function registerUserSuccess(token) {
    localStorage.setItem('token', token);
    return {
        type: REGISTER_USER_SUCCESS,
        payload: {
            token,
        },
    };
}

export function registerUserFailure(error) {
    localStorage.removeItem('token');
    return {
        type: REGISTER_USER_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText,
        },
    };
}

export function registerUser(email, password, first_name, surname, role) {
    return function (dispatch) {
        dispatch(registerUserRequest());
        return create_user(email, password, first_name, surname, role)
            .then(parseJSON)
            .then(response => {
                try {
                    dispatch(registerUserSuccess(response.token));
                    browserHistory.push('/main');
                } catch (e) {
                    dispatch(registerUserFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token',
                        },
                    }));
                }
            })
            .catch(error => {
                dispatch(registerUserFailure({
                    response: {
                        status: 403,
                        statusText: 'User with that email already exists',
                    },
                }
                ));
            });
    };
}

export function getToursSuccess(data) {
    localStorage.setItem('data', data);
    return {
        type: TOURS_SUCCESS,
        payload: data,
    };
}

export function searchTours(searchTerm) {
    return function (dispatch) {
        return get_tours()
            .then(parseJSON)
            .then(response => {
                try {
                    dispatch(getToursSuccess(response));
                } catch (e) {
                    alert(e);
                }
            })
            .catch(error => {});
    };
}

export function getTourSuccess(data) {
    localStorage.setItem('data', data);
    return {
        type: TOUR_SUCCESS,
        payload: data,
    };
}

export function getTour(id) {
    return function (dispatch) {
        return get_tour(id)
            .then(parseJSON)
            .then(response => {
                try {
                    dispatch(getTourSuccess(response));
                } catch (e) {
                    alert(e);
                }
            })
            .catch(error => { });
    };
}

export function getCommentSuccess(data) {
    localStorage.setItem('data', data);
    return {
        type: COMMENT_SUCCESS,
        payload: data,
    };
}

export function getComment(id) {
    return function (dispatch) {
        return get_comment(id)
            .then(parseJSON)
            .then(response => {
                try {
                    dispatch(getCommentSuccess(response));
                } catch (e) {
                    alert(e);
                }
            })
            .catch(error => { });
    };
}
