import axios from "axios";

axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? '//backend-api-01.newbee.ltd/api/v1' : '//backend-api-01.newbee.ltd/api/v1'
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['token'] = localStorage.getItem('token') || ''
axios.defaults.headers.post['Content-Type'] = 'application/json'

const instance = axios.create({
    baseURL: '//backend-api-01.newbee.ltd/api/v1',
    timeout: 30000
})
instance.interceptors.request.use(config => {
    console.log('请求拦截')
    return config
}, error => {
    console.log('请求拦截捕获到错误', err)
})

instance.interceptors.response.use(res => {
    console.log('响应拦截')
    return res.data
}, error => {
    console.log('响应拦截捕获到错误', error)
})

export default instance