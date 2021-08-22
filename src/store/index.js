import {createStore} from 'vuex'
import actions from './action'
import state from './state'
import mutations from './mutations'

export default createStore({
    state,
    mutations,
    actions,
    modules: {}
})