const about = {
    path: '/about',
    name: 'about',
    component: (resolve) => require(['../../../views/about/index'], resolve),
    redirect: '/about/help',
    children: [{
        path: 'help',
        name: 'help',
        component: (resolve) => require(['../../../views/about/help'], resolve)
    }, {
        path: 'newbee',
        name: 'newbee',
        component: (resolve) => require(['../../../views/about/newbee'], resolve),
    }],
    meta: {
        auth: true
    }
};

export default about;
