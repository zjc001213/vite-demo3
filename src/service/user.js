import axios from '../utils/axios'
import {setLocal} from '../common/js/utils'

export function login(params) {
    return axios.post('/user/login', params)
}

export function register(params) {
    return axios.post('/user/register',params)
}

export function getUserInfo() {
    return axios.get('/user/info')
}

export function logout() {
    return axios.post('/user/logout')
}
