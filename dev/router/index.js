import VueRouter from 'vue-router';
import routes from './routes';

const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // 规定路由相关权限放置于全局变量auth中
        if (window.auth && !window.auth[record.meta.authKey]) {
            next({ path: from.path }); // 权限验证不通过则返回之前页面
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;