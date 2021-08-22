import axios from "../utils/axios";

export function getOrderList(params) {
    return axios.get('/order', params)
}