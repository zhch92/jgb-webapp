// 根文件，存放数据操作
import Vue from 'vue'
import * as types from './mutation-types'
import config from '../config'
import userService from '../services/userService'
import { logger, errorHandler } from '../plugins/utils'

/**
 * 获取爱心值
 * @param commit
 * @returns {Promise}
 */
export const fetchPoint = ({ commit }) => {
    return new Promise((resolve, reject) => {
        let [data, errCode] = ['', ''];
        Vue.http.get(config.ajax._get.point).then((resp) => {
            data = resp.body;
            errCode = data.errCode;
            if (!errCode) {
                if (data.data) {
                    commit('GET_POINT_SUCCESS', data.data);
                    resolve();
                }
            } else {
                errorHandler(errCode);
                reject();
            }
        }, (resp) => {
            logger.error('获取企业积分失败，错误码[' + resp.status + ']');
        })
    })
};

/**
 * 获取爱心记录
 * @param commit
 * @param pageNo
 * @returns {Promise}
 */
export const fetchPointsRecord = ({ commit }, pageNo) => {
    return new Promise((resolve, reject) => {
        let [data, errCode] = ['', ''];
        let query = '?type=-1&pageNo=' + pageNo;
        Vue.http.get(config.ajax._get.points + query).then((resp) => {
            data = resp.body;
            errCode = data.errCode;
            if (!errCode) {
                commit('GET_POINTSRECORD_SUCCESS', data.data);
                resolve();
            } else {
                errorHandler(errCode);
                reject();
            }
        }, (resp) => {
            logger.error('获取积分记录失败，错误码[' + resp.status + ']');
        })
    })
};

/**
 * 获取交易记录
 * @param commit
 * @param payload
 * @returns {Promise}
 */
export const fetchTradeList = ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
        let [data, errCode] = ['', ''];
        let query = '?startDate=' + payload.startDate + '&endDate=' + payload.endDate + '&pageNo=' + payload.pageNo + '&txnType=' + payload.txnType;
        Vue.http.get(config.ajax._get.tradeList + query).then((resp) => {
            data = resp.body;
            errCode = data.errCode;
            if (!errCode) {
                commit('GET_TRADELIST_SUCCESS', data.data);
                resolve();
            } else {
                errorHandler(errCode);
                reject();
            }
        }, (resp) => {
            logger.error('获取交易记录失败，错误码[' + resp.status + ']');
            reject();
        });
    })
};

/**
 * 获取收益记录
 * @param commit
 * @param payload
 * @returns {Promise}
 */
export const fetchIncomeList = ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
        let [data, errCode] = ['', ''];
        let query = '?startDate=' + payload.startDate + '&endDate=' + payload.endDate + '&pageNo=' + payload.pageNo;
        Vue.http.get(config.ajax._get.income + query).then((resp) => {
            data = resp.body;
            errCode = data.errCode;
            if (!errCode) {
                commit('GET_INCOME_SUCCESS', data.data);
                resolve();
            } else {
                errorHandler(errCode);
                reject();
            }
        }, (resp) => {
            logger.error('获取收益记录失败，错误码[' + resp.status + ']');
            reject();
        });
    })
};

/**
 * 获取企业信息
 * @param commit
 */
export const fetchTradeInfo = ({ commit }) => {
    let [data, errCode] = ['', ''];
    Vue.http.get(config.ajax._get.tradeInfo).then((resp) => {
        data = resp.body;
        errCode = data.errCode;
        if (!errCode) {
            commit('GET_TRADEINFO_SUCCESS', data.data);
        } else {
            errorHandler(errCode);
        }
    }, (resp) => {
        logger.error('获取企业信息失败，错误码[' + resp.status + ']');
    });
};
/**
 * 获取华信信息
 * @param commit
 */


export const fetchHxTradeInfo = ({ commit }, pageNo) => {
    return new Promise((resolve, reject) => {
        let [data, errCode] = ['', ''];
        Vue.http.get(config.ajax._get.tradeInfo).then((resp) => {
            data = resp.body;
            errCode = data.errCode;
            if (!errCode) {
                resolve(data);
                commit('GET_HXTRADEINFO_SUCCESS', data.data);
            } else {
                errorHandler(errCode);
            }
        }, (resp) => {
            logger.error('获取企业信息失败，错误码[' + resp.status + ']');
        })
    })
};

/**
 * 获取优选基金
 * @param commit
 */
export const fetchRecommend = ({ commit }) => {
    let [data, errCode] = ['', ''];
    Vue.http.get(config.ajax._get.recommend).then((resp) => {
        data = resp.body;
        errCode = data.errCode;
        if (!errCode) {
            commit('GET_RECOMMEND_SUCCESS', data.data);
        } else {
            errorHandler(errCode);
        }
    }, (resp) => {
        logger.error('获取优选基金失败，错误码[' + resp.status + ']');
    });
};

/**
 * 获取持有资产
 * @param commit
 */
export const fetchWealth = ({ commit }) => {
    let [data, errCode] = ['', ''];
    Vue.http.get(config.ajax._get.taAcctDetail).then((resp) => {
        data = resp.body;
        errCode = data.errCode;
        if (!errCode) {
            if (data.data) {
                commit('GET_WEALTH_SUCCESS', data.data);
            }
        } else {
            errorHandler(errCode);
        }
    }, (resp) => {
        logger.error('获取资产信息失败，错误码[' + resp.status + ']');
    });
};

/**
 * 获取产品列表
 * @param commit
 */
export const fetchProducts = ({ commit }) => {
    let [data, errCode] = ['', ''];
    Vue.http.get(config.ajax._get.products).then((resp) => {
        data = resp.body;
        errCode = data.errCode;
        if (!errCode) {
            commit('GET_PRODUCTS_SUCCESS', data.data);
        } else {
            errorHandler(errCode);
        }
    }, (resp) => {
        logger.error('获取产品列表失败，错误码[' + resp.status + ']');
    });
};

/**
 * 获取账户信息
 * @param commit
 * @param pageNo
 * @returns {Promise}
 */
export const fetchAccountInfo = ({ commit }, pageNo) => {
    return new Promise((resolve, reject) => {
        let [data, errCode] = ['', ''];
        let query = '?pageNo=' + pageNo;
        Vue.http.get(config.ajax._get.allTaAcct + query).then((resp) => {
            data = resp.body;
            errCode = data.errCode;
            if (!errCode) {
                commit('GET_ACCOUNTINFO_SUCCESS', data.data);
                resolve();
            } else {
                errorHandler(errCode);
                reject();
            }
        }, (resp) => {
            logger.error('获取账户信息失败，错误码[' + resp.status + ']');
        })
    })
};

/**
 * 用户登录
 * @param commit
 * @param payload
 */
export const userLogin = ({ commit }, payload) => {
    payload = payload || '';
    if (payload) {
        userService.login(payload).then(() => {
            commit(types.USER_LOGIN_SUCCESS)
        })
    } else {
        console.log('12312321')
            commit(types.USER_LOGIN_SUCCESS)
    }
};





/**
 * 用户退出
 * @param commit
 */
export const userLogout = ({ commit }) => {
    userService.logout().then(() => {
        commit('USER_LOGOUT_SUCCESS')
    })
};
/**
 * 华信开户获取城市信息
 * @param commit
 * @param pageNo
 * @returns {Promise}
 */
export const fetchCity = ({ commit }) => {
    return new Promise((resolve, reject) => {
        let [data, errCode] = ['', ''];
        Vue.http.get(config.ajax._get.city).then((resp) => {
            data = resp.body;
            errCode = data.errCode;
            if (!errCode) {
                commit('GET_CITY_SUCCESS', data.data);
                resolve();
            } else {
                errorHandler(errCode);
                reject();
            }
        }, (resp) => {
            logger.error('获取省份失败，错误码[' + resp.status + ']');
        })
    })
};
















