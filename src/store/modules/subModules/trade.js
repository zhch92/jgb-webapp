import * as types from '../../mutation-types'
import { getTradeList, getIncomeList, getTradeInfo,getHxTradeInfo } from '../../getters'
import { fetchTradeList, fetchIncomeList, fetchTradeInfo ,fetchHxTradeInfo } from '../../actions'

const state = {
    tradeInfo: {
        orgNo: '',
        telNo: '',
        idType: '',
        licenceNo: '',
        licenceExpireDate: '',
        taxRegistrationNo: '',
        registrationFileUrl: '',
        organizationNo: '',
        orgNoFileUrl: '',
        bdTel: '',
        bdName: '',
        corpName: '',
        corpIdType: '',
        corpIdNo: '',
        corpIdFileUrl: '',
        corpIdExpireDate: '',
        bankName: '',
        branchBankName: '',
        acctName: '',
        acctNo: '',
        bankOpenAcctPermitFileUrl: '',
        taPowerAttorneyFileUrl: '',
        taContactName: '',
        taContactIdType: '0',
        taContactIdNo: '',
        taContactTel: '',
        taContactIdFileUrl: '',
        taContactExpireDate: ''
    },
    hxTradeInfo: {
        orgNo: '',
        telNo: '',
        idType: '',
        organAddress: '',
        licenceNo: '',
        licenceExpireDate: '',
        taxRegistrationNo: '',
        registrationFileUrl: '',
        organizationNo: '',
        orgNoFileUrl: '',
        bdTel: '',
        bdName: '',
        corpName: '',
        corpIdType: '',
        corpIdNo: '',
        corpIdFileUrl: '',
        corpIdExpireDate: '',
        bankName: '',
        branchBankName: '',
        acctName: '',
        acctNo: '',
        bankAddress: '',
        bankOpenAcctPermitFileUrl: '',
        taPowerAttorneyFileUrl: '',
        taContactName: '',
        taContactIdType: '0',
        taContactIdNo: '',
        taContactEml: '',
        taContactTel: '',
        regcode: '',
        taContactIdFileUrl: '',
        taContactExpireDate: ''
    },
    tradeList: {
        limit: 0,
        totalRows: 0,
        pageNo: 0,
        resultList: [{
            txnTime: '--',
            txnAmount: 0,
            prodName: '',
            txnType: '0',
            remark: '--'
        }]
    },
    incomeList: {
        limit: 0,
        totalRows: 0,
        pageNo: 0,
        resultList: [{
            time: '--',
            income: 0,
            memo: '--'
        }]
    }
};

const getters = {
    getTradeInfo,
    getTradeList,
    getIncomeList,
    getHxTradeInfo
};

const actions = {
    fetchTradeList,
    fetchIncomeList,
    fetchTradeInfo,
    fetchHxTradeInfo
};

const mutations = {
    [types.GET_TRADELIST_SUCCESS](state, tradeList) {
        state.tradeList = tradeList;
    },
    [types.GET_INCOME_SUCCESS](state, incomeList) {
        state.incomeList = incomeList;
    },
    [types.GET_TRADEINFO_SUCCESS](state, tradeInfo) {
        state.tradeInfo = tradeInfo;
    },
    [types.GET_HXTRADEINFO_SUCCESS](state, hxTradeInfo) {
        state.hxTradeInfo = hxTradeInfo;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
