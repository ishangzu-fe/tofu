/**
 * 参考了 vue 2.0 的 bind 方法
 */
export function bind(fn, ctx) {
    function boundFn(a) {
        const l = arguments.length
        return l ?
            l > 1 ?
            fn.apply(ctx, arguments) :
            fn.call(ctx, a) :
            fn.call(ctx)
    }
    boundFn._length = fn.length
    return boundFn
}