import * as types from '../../mutation-types'
import { getRecommend, getWealth, getProducts, getAccountInfo } from '../../getters'
import { fetchRecommend, fetchWealth, fetchProducts, fetchAccountInfo } from '../../actions'


const state = {
    recommend: {
        id: 0,
        name: '',
        decription: '',
        assetType: 0,
        seventhYearYield: 0,
        yieldPerMillion: null,
        valueDate: '--',
        endDate: '--',
        uptTime: '--',
        valueDuration: null
    },
    wealth: {
        orgNo: '',
        totalAsset: 0,
        nowdayIncome: 0,
        totalIncome: 0,
        orgTaAcctlist: [
            {
                orgNo: '',
                taAccountId: '',
                issueId: 0,
                issueBankId: '',
                investorName: '',
                taRegCerFileUrl: '',
                tradeAcco: '',
                taWealthAcctlist: [
                    {
                        taAccountId: '',
                        investorName: '',
                        totalIncome: 0,
                        nowdayIncome: 0,
                        totalAsset: 0,
                        availAsset: 0,
                        issueId: 0,
                        productId: '',
                        prodCode: '',
                        prodName: '',
                        productType: '',
                        uptTime: '',
                        seventhYearYield: 0,
                        yieldPerMillion: 0,
                        securityMarketType: 0
                    }
                ]
            }
        ]
    },
    products: [
        {
            id: 0,
            name: '--',
            decription: '--',
            assetType: 0,
            seventhYearYield: 0.0000,
            yieldPerMillion: 0.00,
            valueDate: '--',
            endDate: '--',
            uptTime: '--',
            valueDuration: null,
            endFlag:false
        }
    ],
    accountInfo: {
        limit: 0,
        totalRows: 0,
        pageNo: 0,
        resultList: [
            {
                investorName: '',
                orgNo: '',
                taAccountId: '',
                status: 0,
                issueId: 0
            }
        ]
    }
};

const getters = {
    getRecommend,
    getWealth,
    getProducts,
    getAccountInfo
};

const actions = {
    fetchRecommend,
    fetchWealth,
    fetchProducts,
    fetchAccountInfo
};

const mutations = {
    [types.GET_RECOMMEND_SUCCESS] (state, recommend) {
        state.recommend = recommend;
    },
    [types.GET_WEALTH_SUCCESS] (state, wealth) {
        state.wealth = wealth;
    },
    [types.GET_PRODUCTS_SUCCESS] (state, products) {
        state.products = products
    },
    [types.GET_ACCOUNTINFO_SUCCESS] (state, accountInfo) {
        state.accountInfo = accountInfo;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
