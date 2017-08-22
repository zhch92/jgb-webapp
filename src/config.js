const basePath = '/jgb-web/v1/';

const config = {
    info: {
        serveTel: '021-64859676',
        serveTime: '9:00-18:00',
        serveWeiXin: 'jigoubao',
        address: '上海市徐汇区乐山路33号1号楼210室',
        license: 'Copyright© 2014-2017 51jigoubao All Rights Reserved 版权所有: 上海基智信息咨询有限公司',
        copyright:'31010402001819'
    },
    session: {
        loginKey: 'jgb_logged',
        userKey: 'jgb_userInfo'
    },
    cookie: {
        default: {
            path: '/jgb-web/'
        },
        userKey: 'UUID'
    },
    ajax: {
        tradeInfo: basePath + 'organ/tradeInfo',
        _get: {
            products: basePath + 'products',
            wealth: basePath + 'wealth',
            totalAsset: basePath + 'wealth/totalAssert',
            taAcctDetail: basePath + 'wealth/taAcctDetail',
            points: basePath + 'points',
            point: basePath + 'points/point',
            recommend: basePath + 'products/rec',
            tradeList: basePath + 'tradelist',
            income: basePath + 'wealth/income',
            bankInfo: basePath + 'organ/bankInfo',
            transferBank: basePath + 'organ/getTransferBankInfo',
            branchBank: basePath + 'organ/getPayBranchBank',
            taInfo: basePath + 'organ/taInfo',
            allTaAcct: basePath + 'organ/allTaAcct',
            remain:basePath+'products/remain'

        },
        _post: {
            uploadImg: basePath + 'file',
            login: basePath + 'organ/login',
            register: basePath + 'organ/reg',
            forget: basePath + 'organ/pass',
            sms: basePath + 'sms',
            hxSms: basePath + 'sms/hx',
            account: basePath + 'organ/tradeInfo',
            reser: basePath + 'products/reser',
            quickWithdraw: basePath + 'products/quickWithdraw',
            changePwd: basePath + 'organ/modifyPass',
            feedback: basePath + 'organ/feedBack',
            openAcct: basePath + 'organ/openAcct',
            taOpenAcct: basePath + 'organ/taOpenAcct',
            modifyBankInfo: basePath + 'organ/modifyBankInfo',
            lofConfirmAcct: basePath + 'organ/lofConfirmAcct',
            etfConfirmAcct: basePath + 'organ/etfConfirmAcct',
            taSubscribe: basePath + 'organ/taSubscribe'
        }
    }
};

export default config;
