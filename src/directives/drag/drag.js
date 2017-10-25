import Vue from 'vue'

// 仅沿x或y或两轴移动
let moveX, moveY, moveAll

let eventList = {}

export default (el, binding, vnode) => {
    // 设置元素不能拖拽
    if (el.dataset.canDrag === 'false') {
        return false
    }

    if (binding.value === false) {
        el.dataset.canDrag = false
        return false
    }

    // 判断是否进行了初始化，防止重复设置事件句柄
    if (el.dataset.initDrag !== 'true') {
        eventList.mousedown = onMousedown.bind(el)
        eventList.mouseup = onMouseup.bind(el)
        eventList.mousemove = onMousemove.bind(el)
        addListener(el, 'mousedown', eventList.mounsedown)
        addListener(el, 'mouseup', eventList.mounseup)
        addListener(el, 'mousemove', eventList.mounsemove)
        // addListener(el, 'mouseleave', onMouseup.bind(el))

        el.dataset.canDrag = "true"

        // 调整鼠标光标
        // el.style.cursor = '-webkit-grab'

        // 判断是否绑定了修饰符
        let modifiers = binding.modifiers
        if (modifiers.x || modifiers.y) {
            if (modifiers.x) {
                moveX = true
            }
            if (modifiers.y) {
                moveY = true
            }
        } else {
            moveAll = true
        }

        el.dataset.initDrag = true
    }

    // 当绑定了参数和值时，进行解绑和绑定
    if (binding.arg && binding.value) {
        switch (binding.arg) {
            case 'start':
                _removeAndAdd('mousedown', onMousedown)
                break
            case 'end':
                _removeAndAdd('mouseup', onMouseup)
                break
            case 'move':
                _removeAndAdd('mousemove', onMousemove)
                break
            default:
                break;
        }
    }

    function _removeAndAdd (eventName, newFn) {
        removeAndAdd(
            el, 
            eventName,
            eventList[eventName], 
            getHandler(newFn.bind(el), binding.value) // binding.value在传递时，使用了Vue工具方法bind, 所以不需要再次绑定上下文
        )
    }
}

function addListener (el, eventName, fn) {
    el.addEventListener(eventName, fn)
}

function removeListener (el, eventName, fn) {
    el.removeEventListener(eventName, fn)
}

/**
 * 移除再添加事件句柄
 * @param {HTMLElement} el 
 * @param {String} eventName 
 * @param {Function} oldFn 
 * @param {Function} newFn 
 */
function removeAndAdd (el, eventName, oldFn, newFn) {
    removeListener(el, eventName, oldFn)
    addListener(el, eventName, newFn)
}

function getHandler (fn, ...params) {
    return function (event) {
        fn(event, ...params)
    }
}

/**
 * 封装事件对象
 * @param {MouseEvent} event 
 * @param {HTMLElement} el 
 */
function getEvent (event, el) {
    return {
        el,
        x: event.screenX,
        y: event.screenY,
        initX: parseFloat(el.dataset.initX),
        initY: parseFloat(el.dataset.initY),
        moveX: event.screenX - el.dataset.initX,
        moveY: event.screenY - el.dataset.initY
    }
}

function onMousedown (event, cb) {
    if (this.dataset.canDrag !== 'true' || event.button !== 0) {
        return false
    }

    // 用于区分点击和鼠标按下事件
    this.dataset.isDrag = '1'
    setTimeout(() => {
        if (this.dataset.isDrag === '1') {
            this.style.cursor = '-webkit-grabbing'    
            this.dataset.dragging = 1
            this.dataset.initX = event.screenX
            this.dataset.initY = event.screenY

            this.style.zIndex = '999' 

            cb && cb(getEvent(event, this))
        }
    }, 150)

}

function onMouseup (event, cb) {
    this.dataset.isDrag = '0'
    if (this.dataset.canDrag !== 'true' ||
        (this.dataset.dragging === undefined || this.dataset.dragging === '0')
    ) {
        return false
    }

    // this.style.cursor = '-webkit-grab'
    this.style.cursor = 'pointer'
    this.dataset.dragging = 0
    this.style.transform = 'translateX(0px)'
    this.style.zIndex = ''

    cb && cb(getEvent(event, this))
}

function onMousemove (event, cb) {
    if (this.dataset.dragging === '1') {
        let relX = event.screenX - this.dataset.initX
        let relY = event.screenY - this.dataset.initY

        if (moveAll || (moveX && moveY)) {
            this.style.transform = `translate(${relX}px, ${relY}px)`
        } else if (moveX && !moveY) {
            this.style.transform = `translateX(${relX}px)`            
        } else if (moveY && !moveX) {
            this.style.transform = `translateY(${relY}px)`            
        }

        cb && cb(getEvent(event, this))
    } else {
        return false
    }

}
