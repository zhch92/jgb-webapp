const account = {
    path: '/account',
    name: 'account',
    component: (resolve) => require(['../../../views/account/index'], resolve),
    redirect: '/account/wealth',
    children: [{
            path: 'wealth',
            name: 'wealth',
            component: (resolve) => require(['../../../views/account/wealth'], resolve)
        }, {
            path: 'product',
            name: 'product',
            component: (resolve) => require(['../../../views/account/product'], resolve)
        }, {
            path: 'trade',
            name: 'trade',
            component: (resolve) => require(['../../../views/account/trade'], resolve)
        }, {
            path: 'point',
            name: 'point',
            component: (resolve) => require(['../../../views/account/point'], resolve)
        },
            {
            path: 'companyInfo',
            name: 'companyInfo',
            component: (resolve) => require(['../../../views/account/companyInfo'], resolve)
        },
        {
            path: 'updateInfo',
            name: 'updateInfo',
            component: (resolve) => require(['../../../views/account/updateInfo'], resolve)
        }, {
            path: 'accountInfo',
            name: 'accountInfo',
            component: (resolve) => require(['../../../views/account/accountInfo'], resolve)
        }, {
            path: 'changePwd',
            name: 'changePwd',
            component: (resolve) => require(['../../../views/account/changePwd'], resolve)
        }, {
            path: 'feedback',
            name: 'feedback',
            component: (resolve) => require(['../../../views/account/feedback'], resolve)
        }],
    meta: {
        auth: true
    }
};

export default account;
