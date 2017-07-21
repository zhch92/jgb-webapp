const common = [
    {
        path: '/index',
        name: 'index',
        component: (resolve) => require(['../../../views/index'], resolve)
    },{
        path: '/safe',
        name: 'safe',
        component: (resolve) => require(['../../../views/safe'], resolve),
    }, {
        path: '/current',
        name: 'current',
        component: (resolve) => require(['../../../views/current'], resolve),
    }, {
        path: '/login',
        name: 'login',
        component: (resolve) => require(['../../../views/login'], resolve),
    }, {
        path: '/forget',
        name: 'forget',
        component: (resolve) => require(['../../../views/forget'], resolve)
    }, {
        path: '/register',
        name: 'register',
        component: (resolve) => require(['../../../views/register'], resolve)
    },
    { path: '*', redirect: '/index' }
];

export default common;
