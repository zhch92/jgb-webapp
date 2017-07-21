import Vue from 'vue'
import VueResource from 'vue-resource'
import router from './router'
import store from './store'
import filters from './filters'
import * as App from './App'

// 使用插件
Vue.use(VueResource);

// 加载过滤器
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));

// AJAX 配置
Vue.http.interceptors.push((req, next) => {
    const index = window.layer.load(2, { shade: [0.1], time: 0 });
    next((resp) => {
        window.layer.close(index);
    })
});

// 启动应用
const app = new Vue({
    router,
    store,
    ...App
}).$mount('app');
