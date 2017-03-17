import Service from 'services';

export default {
    getDict(){
        if(!window['dict']){
            return Service.$get('/app_web_cheap/CommDictController/getDictList');
        }
    },
    getPermission (params) {
        if(!window['permission']){
            return Service.$get('/isz_base/CommController/power.action', params);
        }
    },
    authLogin (params) {
        return Service.$post('/isz_base/LoginController/auth.action', params);
    },
    oldAuth (params) {
        return Service.$get('/sysauth', params)
    },
    getOldMenus () {
        return Service.$get('/navigation?systemCode=AppService');
    },
    logout () {
        return Service.$get('/isz_base/LoginController/logout.action');
    },
    getMenus (params) {
        return Service.$get('/isz_base/CommController/treeMenu.action', {
            res_category: 'APPCLIENT'
        });
    }
}
