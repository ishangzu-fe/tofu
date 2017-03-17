import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './router';
import Core from 'core';
import App from './App';

import './styles/index.scss';

Vue.use(Core);
Vue.use(VueRouter);

new Vue({
    el:'#app',
    router,
    template: '<App/>',
    components: { App }
})
