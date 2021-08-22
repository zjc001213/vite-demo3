import axios from '../utils/axios';

export function getHome() {
    return axios.get('http://backend-api-01.newbee.ltd/api/v1/index-infos')
}