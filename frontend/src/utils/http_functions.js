/* eslint camelcase: 0 */

import axios from 'axios';

const tokenConfig = (token) => ({
    headers: {
        'Authorization': token, // eslint-disable-line quote-props
    },
});

export function validate_token(token) {
    return axios.post('/api/is_token_valid', {
        token,
    });
}

export function get_github_access() {
    window.open(
        '/github-login',
        '_blank' // <- This is what makes it open in a new window.
    );
}

export function create_user(email, password) {
    return axios.post('api/create_user', {
        email,
        password,
    });
}

export function get_token(email, password) {
    return axios.post('api/get_token', {
        email,
        password,
    });
}

export function has_github_token(token) {
    return axios.get('api/has_github_token', tokenConfig(token));
}

export function data_about_user(token) {
    return axios.get('api/user', tokenConfig(token));
}

export function get_countries() {
    return axios.get('api/countries');
}

export function get_tours() {
    return axios.get('api/tooo');
}

export function upload_file(file) {
    var data = new FormData();
    alert('axios  ' + file[0]);
    data.append('file', file[0]);
    const options = {
        headers: {
            'Content-Type': 'multipart/ form - data'
        }
    };
    return axios.post('api/upload', data, options);
}