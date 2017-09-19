import * as types from '../../mutation-types'
import { getUserState ,getCity} from '../../getters'
import { userLogin, userLogout,fetchCity } from '../../actions'

const state = {
    userLogged: false,
    city:[{
        "provCode": "",
        "provName": "请选择",
        "areaName": "",
        "provPinyinSi": "",
        "provPinyin": ""
    }]
};

const getters = {
    getUserState,
    getCity
};

const actions = {
    userLogin,
    userLogout,
    fetchCity
};


const mutations = {
    [types.USER_LOGIN_SUCCESS] (state) {
        state.userLogged = true
    },
    [types.USER_LOGOUT_SUCCESS] (state) {
        state.userLogged = false
    },
    [types.GET_CITY_SUCCESS] (state, agentInfo) {
        state.city = [{
            "provCode": "",
            "provName": "请选择",
            "areaName": "",
            "provPinyinSi": "",
            "provPinyin": ""
        },...agentInfo]
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
