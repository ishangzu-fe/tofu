### 快速上手
本节将介绍如何在项目中使用 tofu

引入 tofu
在 <code>index.js</code> 中写入以下内容

<highlight-code lang="javascript">
import Vue from 'vue';
import App from './app';
import Tofu from '../src';
Vue.use(Tofu);
Vue.use(Tofu.Previewer);
new Vue({
    el:'#app',
    template: '<App/>',    
    components:{App},
    router
});
</highlight-code>
