//
// import services from '../../frame/lib/utils/services';
// const verification = {
//     getCouponList(params){
//         return services.$post('/app_web_cheap/BatchController/couponList', params);
//     },
//     cancelDestroy(couponId){
//         return services.$get('/app_web_cheap /app_web_cheap/CouponBatchController/coupon/couponrevokecancel/' + couponId ,{});
//     },
//     batchCoupon(couponsFile){
//         return services.$post('/app_web_cheap/CouponBatchController/coupon/importcancel',couponsFile);
//     },
//     exportDestroyExcel(params){
//         return services.$post('/app_web_cheap/CouponBatchController/coupon/exportcouponcancel' , params);
//     },
//     destroyCoupon(couponId){
//         return services.$get('/app_web_cheap/CouponBatchController/coupon/couponcancel/' + couponId , {});
//     }
// }
// export default  verification;

import Services from 'services';

export default {
    /**
     * 撤销核销
     *
     * @param {number} id 券码id
     */
    cancel (id) {
        return Services.$get(`/app_web_cheap/CouponController/coupon/couponrevokecancel/${id}`);
    },
    /**
     * Excel批量核销优惠券
     */
    cancelByExcel (params) {
        return Services.$post('/app_web_cheap/CouponBatchController/coupon/importcancel', parmas);
    },
    /**
     * 获取优惠券核销列表
     */
    getDestroyList (params) {
        return Services.$post('/app_web_cheap/CouponController/coupon/couponcancellist', params);
    },
    /**
     * 导出Excel
     */
    exportExcel (params) {
        return Services.$post('/app_web_cheap/CouponController/coupon/exportcouponcancel', params);
    },
    /**
     * 核销
     *
     * @param {number} code 优惠券编码
     */
    destroy (code) {
        return Services.$get(`/app_web_cheap/CouponController/coupon/couponcancel/${code}`);
    }
}
