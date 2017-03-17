import Services from 'services';

export default {
    /**
     * 获取优惠券列表
     */
    getTickets (params) {
        return Services.$post('/app_web_cheap/CouponBatchController/couponbatch/couponbatchlist', params);
    },
    /**
     * 获取单个优惠券
     * 
     * @param {number} id 优惠券id
     */
    getTicket (id) {
        return Services.$get(`/app_web_cheap/CouponBatchController/couponbatch/${id}`);
    },
    /**
     * 新增优惠券
     */
    addTicket (params) {
        return Services.$post('/app_web_cheap/CouponBatchController/couponbatch/save', params);
    },
    /**
     * 修改优惠券
     */
    modifyTicket (params) {
        return Services.$put('/app_web_cheap/CouponBatchController/couponbatch/save', params);
    },
    deleteTicket (id) {
        return Services.$get(`/app_web_cheap/CouponBatchController/couponbatch/delete/${id}`);
    },
    /**
     * 获取券码信息列表
     */
    getCodes (params) {
        return Services.$post('/app_web_cheap/CouponController/coupon/couponlist', params);
    },
    /**
     * 新增券码
     */
    addCode (params) {
        return Services.$post('/app_web_cheap/CouponController/coupon/save', params);
    },
    /**
     * 导入券码
     */
    importCodes (params) {
        return Services.$post('/app_web_cheap/CouponController/coupon/import', params);
    },
    /**
     * 删除券码
     * 
     * @param {number} id 券码id
     */
    deleteCode (id) {
        return Services.$get(`/app_web_cheap/CouponController/coupon/delete/${id}`);
    }
}