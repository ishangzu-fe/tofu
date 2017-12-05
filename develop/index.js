import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './router';
import App from './App';
import 'normalize.css';
import './view/normalize.css';
import './view/font/font.css';

import Tofu from '@/index.js';

Vue.use(Tofu);
Vue.use(VueRouter);

new Vue ({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});
