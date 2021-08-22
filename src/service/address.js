import axios from '../utils/axios'
export function getAddressList() {
    return axios.get('/address', {pageNumber: 1, pageSize: 1000})
}


export function getAddressDetail(id) {
    return axios.get(`/address/${id}`)
}

export function addAddress(params) {
    return axios.post('/address', params)
}

export function editAddress(params) {
    return axios.put('/address', params)
}

export function deleteAddress(id) {
    return axios.delete(`/address/${id}`)
}