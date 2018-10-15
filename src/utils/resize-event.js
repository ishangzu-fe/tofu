/**
 * Modified from https://github.com/sdecima/javascript-detect-element-resize
 *
 * version: 0.5.3
 **/

import ResizeObserver from 'resize-observer-polyfill';

const isServer = typeof window === 'undefined';

/* istanbul ignore next */
const requestFrame = (function () {
    const raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
        function (fn) {
            return window.setTimeout(fn, 20);
        };
    return function (fn) {
        return raf(fn);
    };
})();

/* istanbul ignore next */
const cancelFrame = (function () {
    const cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout;
    return function (id) {
        return cancel(id);
    };
})();

/* istanbul ignore next */
const resetTrigger = function (element) {
    const trigger = element.__resizeTrigger__;
    const expand = trigger.firstElementChild;
    const contract = trigger.lastElementChild;
    const expandChild = expand.firstElementChild;

    contract.scrollLeft = contract.scrollWidth;
    contract.scrollTop = contract.scrollHeight;
    expandChild.style.width = expand.offsetWidth + 1 + 'px';
    expandChild.style.height = expand.offsetHeight + 1 + 'px';
    expand.scrollLeft = expand.scrollWidth;
    expand.scrollTop = expand.scrollHeight;
};

/* istanbul ignore next */
const checkTriggers = function (element) {
    return element.offsetWidth !== element.__resizeLast__.width || element.offsetHeight !== element.__resizeLast__.height;
};

/* istanbul ignore next */
const scrollListener = function (event) {
    resetTrigger(this);
    if (this.__resizeRAF__) cancelFrame(this.__resizeRAF__);
    this.__resizeRAF__ = requestFrame(() => {
        if (checkTriggers(this)) {
            this.__resizeLast__.width = this.offsetWidth;
            this.__resizeLast__.height = this.offsetHeight;
            this.__resizeListeners__.forEach((fn) => {
                fn.call(this, event);
            });
        }
    });
};

/* Detect CSS Animations support to detect element display/re-attach */
const attachEvent = document.attachEvent;
const DOM_PREFIXES = 'Webkit Moz O ms'.split(' ');
const START_EVENTS = 'webkitAnimationStart animationstart oAnimationStart MSAnimationStart'.split(' ');
const RESIZE_ANIMATION_NAME = 'resizeanim';
let animation = false;
let keyFramePrefix = '';
let animationStartEvent = 'animationstart';

/* istanbul ignore next */
if (!attachEvent) {
    const testElement = document.createElement('fakeelement');
    if (testElement.style.animationName !== undefined) {
        animation = true;
    }

    if (animation === false) {
        let prefix = '';
        for (var i = 0; i < DOM_PREFIXES.length; i++) {
            if (testElement.style[DOM_PREFIXES[i] + 'AnimationName'] !== undefined) {
                prefix = DOM_PREFIXES[i];
                keyFramePrefix = '-' + prefix.toLowerCase() + '-';
                animationStartEvent = START_EVENTS[i];
                animation = true;
                break;
            }
        }
    }
}

let stylesCreated = false;
/* istanbul ignore next */
const createStyles = function () {
    if (!stylesCreated) {
        const animationKeyframes = `@${keyFramePrefix}keyframes ${RESIZE_ANIMATION_NAME} { from { opacity: 0; } to { opacity: 0; } } `;
        const animationStyle = `${keyFramePrefix}animation: 1ms ${RESIZE_ANIMATION_NAME};`;

        // opacity: 0 works around a chrome bug https://code.google.com/p/chromium/issues/detail?id=286360
        const css = `${animationKeyframes}
      .resize-triggers { ${animationStyle} visibility: hidden; opacity: 0; }
      .resize-triggers, .resize-triggers > div, .contract-trigger:before { content: \" \"; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; }
      .resize-triggers > div { background: #eee; overflow: auto; }
      .contract-trigger:before { width: 200%; height: 200%; }`;

        const head = document.head || document.getElementsByTagName('head')[0];
        const style = document.createElement('style');

        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        head.appendChild(style);
        stylesCreated = true;
    }
};

/* istanbul ignore next */
const resizeHandler = function (entries) {
    for (let entry of entries) {
        const listeners = entry.target.__resizeListeners__ || [];
        if (listeners.length) {
            listeners.forEach(fn => {
                fn();
            });
        }
    }
};

/* istanbul ignore next */
export const addResizeListener = function (element, fn) {
    if (isServer) return;
    if (!element.__resizeListeners__) {
        element.__resizeListeners__ = [];
        element.__ro__ = new ResizeObserver(resizeHandler);
        element.__ro__.observe(element);
    }
    element.__resizeListeners__.push(fn);
};

/* istanbul ignore next */
export const removeResizeListener = function (element, fn) {
    if (!element || !element.__resizeListeners__) return;
    element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
    if (!element.__resizeListeners__.length) {
        element.__ro__.disconnect();
    }
};
