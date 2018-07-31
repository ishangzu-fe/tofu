import Vue from 'vue';
import router from './router';
import VueRouter from 'vue-router';
import App from './app';
import Tofu from '../src';
import DemoBlock from './component/demo-block';
import codeDemoBlock from './component/codeDemoBlock'
import './main.scss'

Vue.use(VueRouter);

Vue.use(Tofu);
Vue.use(Tofu.Previewer);

// 代码文档模板
Vue.component('codeDemoBlock', codeDemoBlock);

Vue.component('item-zh',{
    functional:true,
    render(h,ctx){
        let item = ctx.props.item;
        return h('li',ctx.data,[
            h('div',{attrs:{class:'name'}},[item.value]),
            h('span',{attrs:{class:'addr'}},[item.address])
        ]);
    },
    props:{
        item:{
            type:Object,
            required:true
        }
    }
});

Vue.component('demo-block', DemoBlock);

new Vue({
    el:'#app',
    template: '<App/>',    
    components:{App},
    router
});