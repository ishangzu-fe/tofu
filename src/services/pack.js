import Services from 'services';

export default {
    /**
     * 礼包列表
     */
    getPacks (params) {
        return Services.$post('/app_web_cheap/PackageController/packageList', params);
    },
    /**
     * 新增礼包
     */
    addPack (params) {
        return Services.$post('/app_web_cheap/PackageController/package', params);
    },
    /**
     * 修改礼包
     * 
     * @param {number} id 礼包id
     */
    modifyPack (id, params) {
        return Services.$put(`/app_web_cheap/PackageController/package/${id}`, params);
    },
    /**
     * 获取礼包详情
     * 
     * @param {number} id 礼包id
     */
    getPack (id) {
        return Services.$get(`/app_web_cheap/PackageController/package/${id}`);
    },
    /**
     * 删除礼包
     * 
     * @param {number} id 礼包id
     */
    deletePack (id) {
        return Services.$delete(`/app_web_cheap/PackageController/package/${id}`);
    }
}