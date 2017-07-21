import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { storageManager } from '../plugins/utils'
import Nanobar from '../plugins/nanobar'
import config from '../config'

Vue.use(VueRouter);

const nanobar = new Nanobar();

const router = new VueRouter({
    mode: 'history',
    base: 'jgb-web',
    linkActiveClass: 'active',
    scrollBehavior: () => ({ y: 0 }),
    routes: routes
});

// 进入路由前
router.beforeEach((to, from, next) => {
    window.layer.closeAll('tips');
    nanobar.go(0);
    if (to.matched.some(record => record.meta.auth)) {
        if (storageManager.getItem(config.session.loginKey, false)) {
            next();
        } else {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            });
        }
    } else {
        next();
    }
});

// 进入路由后
router.afterEach((to, from, next) => {
    nanobar.go(100);
});

export default router;
