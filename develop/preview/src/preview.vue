<template>
    <div class="previewer" id="previewer-cover">
        <transition name="cover">
            <div
                class="cover"
                ref="cover"
                v-show="showCover">
                <div class="cover-top-bar">
                    <span class="serial">{{(parseInt(fakeIndex) + 1)}} / {{loadedImages.length}}</span>
                    <span
                        class="close-button tofu-icon icon-close"
                        @click="close">
                    </span>
                </div>
                <span
                    v-show="loadedImages.length > 1 && fakeIndex > 0"
                    class="arrow tofu-icon icon-point-left"
                    @click="switchImage('left')"
                ></span>
                <span
                    v-show="loadedImages.length > 1 && fakeIndex < loadedImages.length - 1"
                    class="arrow tofu-icon icon-point-right"
                    @click="switchImage('right')"
                ></span>
                <img
                    v-show="loadedImages[this.curImgIdx] && !loadedImages[this.curImgIdx].cached"
                    :src="loadedImages[this.curImgIdx] && loadedImages[this.curImgIdx].src"
                    class="loading-image"
                    alt="图片加载失败">
                </img>
                <transition
                    name="scale"
                    @enter="enter"
                    @leave="leave"
                    @afterLeave="afterLeave"
                    :css="true"
                    v-for="(image, idx) in images"
                    :key="image.id">
                    <img
                        class="preview-image"
                        v-show="image.id === curImgId && image.cached"
                        :src="image.src"
                        :data-idx="idx"
                        :data-id="image.id"
                        @load="handleImageLoad"
                    ></img>
                </transition>
            </div>
        </transition>
    </div>
</template>

<script>
let imageId = 0;
const HEADER_HEIGHT = 44;
const getDimension = () => {
    const windowHeight = document.documentElement.clientHeight;
    const windowWidth = document.documentElement.clientWidth;
    const galleryHeight = windowHeight - HEADER_HEIGHT * 2;
    const galleryWidth = windowWidth;

    return {
        windowHeight,
        windowWidth,
        galleryHeight,
        galleryWidth
    }
}

export default {
    name: 'previewer',

    data () {
        return {
            size: null, // 存放经过计算后的尺寸信息
            showCover: false,

            images: [], // 可以放大的图片数组
            loadedImages: [], // 加载的图片

            justPreview: false, // 仅仅做展示，即调用 preview 方法

            curImgId: -1, // 当前展示的图片的 id

            curImgIdx: -1,
            oldImgIdx: -1,
            fakeIndex: -1,
            isJumping: false,

            isSwitch: false, // 判断图片的出现是否是切换
        };
    },

    watch: {
        curImgIdx (newV, oldV) {
            this.oldImgidx = oldV;
            this.fakeIndex = newV;

            if (oldV === -1 || newV === -1) {
                this.isSwitch = false;
            } else {
                this.isSwitch = true;
            }
        }
    },

    methods: {
        /**
         * 预览，挂载在每个 vue 实例的 $preview 方法
         *
         * @param {Object|Array<Object|String>|String|Number} images 传递的需要做预览的图片
         * @param {Number} defaultIndex 默认展示图片索引
         */
        preview (images, defaultIndex = 0) {
            this.justPreview = true;
            this.loadedImages = [];

            let data

            // 处理参数
            if (defaultIndex < 0) defaultIndex = 0;
            if (defaultIndex > images.length - 1) defaultIndex = images.length - 1;

            if (Array.isArray(images)) {
                data = images
            } else if (typeof images === 'object') {
                defaultIndex = images.defaultIndex || defaultIndex;
                data = images.images
            }

            if (!this.images.length) { // 是否已有缓存
                this.images = this.loadedImages = this.images.concat(normalizeData.call(this, data));
            } else {
                this.images = this.images.concat(
                    checkCache.call(this, normalizeData.call(this, data), this.images)
                );
            }

            this.showCover = true;
            this.$nextTick(() => {
                this.curImgId = this.loadedImages[defaultIndex].id;
                this.curImgIdx = defaultIndex;
            });

            /**
             * @param {Array} origin 原始图片数据数组
             */
            function normalizeData (origin) {
                if (!Array.isArray(origin))
                    console.error('images 必须是数组类型');

                const handled = origin.map(unit => {
                    if (typeof unit === 'string') {
                        return {
                            src: unit,
                            id: imageId++
                        }
                    } else if (typeof unit === 'object') { // 不严谨的对象类型检查
                        return Object.assign({ id: imageId++ }, unit)
                    } else {
                        console.error('传递的数据单元必须是字符串或对象类型');
                    }
                })

                return handled;
            }

            /**
             * 检查缓存, 抛出 id
             * @param {Array<Object>} origin
             * @param {Array<Object>} cache
             */
            function checkCache (origin, cache) {
                const reduced = origin.filter(unit => {
                    const isEveryNotDup = cache.every(imgObj => {
                        if (unit.src === imgObj.src) {
                            // 如果 src 相同，取已缓存的图片对象
                            this.loadedImages.push(imgObj);
                        }

                        return unit.src !== imgObj.src;
                    });

                    if (isEveryNotDup) this.loadedImages.push(unit);

                    return isEveryNotDup;
                });

                return reduced;
            }
        },

        /**
         * 图片加载完成时，计算初始化大小，只会在第一次加载时触发
         */
        handleImageLoad (event) {
            const el = event.currentTarget;
            this.setImageSize(el)

            // 记录 dom 元素对象
            this.images[el.dataset.idx].el = el;
        },

        /**
         * @param {Object} image 图片对象
         */
        setImageSize (el, immediate = false) {
            if (!el) return;

            const eh = el.dataset.originHeight || el.height; // 图片高度
            const ew = el.dataset.originWidth || el.width; // 图片宽度
            const gh = this.size.galleryHeight;
            const gw = this.size.galleryWidth;

            let width, height;

            const hRadio = eh / gh;
            const wRadio = ew / gw;

            // 计算图片缩放比例
            if (hRadio <= 1 && wRadio <= 1) {
                width = ew;
                height = eh;
            } else if (hRadio > 1 && wRadio <= 1) {
                width = ew / hRadio;
                height = gh;
            } else if (hRadio <= 1 && wRadio > 1) {
                width = gw;
                height = eh / wRadio;
            } else if (hRadio > 1 && wRadio > 1) {
                const radio = hRadio > wRadio ? hRadio : wRadio;
                width = ew / radio;
                height = eh / radio;
            }

            el.dataset.width = width;
            el.dataset.height = height;
            el.dataset.originWidth = ew;
            el.dataset.originHeight = eh;

            let imgObj = this.images[el.dataset.idx];
            imgObj.cached = true;
            this.images.splice(el.dataset.idx, 1, imgObj);

            if (immediate) {
                el.style.width = width + 'px';
                el.style.height = height + 'px';
            }
        },

        handleResize () {
            this.images.forEach(image => {
                image.cached = false;

                if (image.id === this.curImgId)
                    this.setImageSize(image.el, true);
            });

            this.loadedImages.forEach(image => {
                if (!image.cached)
                    this.setImageSize(image.el);
            });

            this.images.forEach(image => {
                if (!image.cached)
                    this.setImageSize(image.el);
            });
        },

        /**
         * 关闭预览
         */
        close () {
            this.curImgId = -1;
            this.curImgIdx = -1;

            if (this.justPreview) {
                this.showCover = false;
            } else {
                setTimeout(() => {
                    this.showCover = false;
                }, 250);
            }
        },

        /**
         * 切换图片
         */
        switchImage (direction) {
            this.fakeIndex = this.fakeIndex >= 0 ? this.fakeIndex : this.curImgIdx;
            this.direction = direction;

            if (direction === 'left') {
                if (this.fakeIndex === 0) {
                    return false;
                }

                this.fakeIndex -= 1;
            } else {
                if (this.fakeIndex === this.loadedImages.length - 1) {
                    return false;
                }

                this.fakeIndex += 1;
            }

            this.jumpTo(this.fakeIndex);
        },

        /**
         * 跳转至指定图片
         */
        jumpTo (index) {
            if (this.isJumping) return;

            this.isJumping = true;
            setTimeout(() => {
                this.isJumping = false;
                if (index === this.fakeIndex) {
                    this.curImgId = this.loadedImages[index].id;
                    this.curImgIdx = index;

                    this.$nextTick(() => {
                        if (!this.loadedImages[this.curImgIdx].cached) {
                            this.isSwitch = false;
                        }
                    })
                } else {
                    this.jumpTo(this.fakeIndex)
                }
            }, 300);
        },

        enter (el, done) {
            if (this.isSwitch) {
                if (this.justPreview) {
                    if (this.direction === 'left') {
                        el.style.left = '-50%';
                        el.style.transform = 'translate(-50%, -50%) scale(.5)';
                    } else {
                        el.style.left = '150%';
                        el.style.transform = 'translate(50%, -50%) scale(.5)';
                    }

                    el.style.width = el.dataset.width + 'px';
                    el.style.height = el.dataset.height + 'px';
                    el.style.top = '50%';

                    setTimeout(() => {

                        if (this.direction === 'left') {
                            el.style.left = `${this.size.windowWidth / 2}px`;
                            el.style.transform = `translate(-50%, -50%) scale(1)`;
                        } else {
                            el.style.left = `${this.size.windowWidth / 2}px`;
                            el.style.transform = `translate(-50%, -50%) scale(1)`;
                        }
                        done();
                    }, 20);
                }
            } else {
                if (this.justPreview) {
                    el.style.width = '50%';
                    el.style.height = 'auto';
                    el.style.top = '50%';
                    el.style.left = '50%';
                    el.style.transform = 'translate(-50%, -50%)';

                    setTimeout(() => {
                        el.style.width = el.dataset.width + 'px';
                        el.style.height = el.dataset.height + 'px';
                        done();
                    }, 20);
                }
            }
        },

        leave (el, done) {
            if (this.isSwitch) {
                if (this.justPreview) {
                    if (this.direction === 'right') {
                        el.style.left = '-50%';
                    } else {
                        el.style.left = '100%';
                    }
                    el.style.top = '50%';
                    el.style.transform = 'translateY(-50%) scale(.5)';
                }
            }

            setTimeout(() => {
                // 500ms 后结束
                done();
            }, 500)
        },

        /**
         * 过渡结束后，重置图片样式
         */
        afterLeave (el) {
            el.style.width = '';
            el.style.height = '';
            el.style.top = '';
            el.style.left = '';
            el.style.right = '';
            el.style.transform = '';
        }
    },

    mounted () {
        this.size = getDimension(); // 初始化尺寸信息

        window.onresize = () => {
            // 重新计算尺寸信息
            // 重新计算所有图片对象的尺寸信息
            // 优先计算当前展示图片的尺寸信息，然后是装载的图片
            // 并调账当前展示图片的大小
            this.size = getDimension();
            this.handleResize();
        }
    }
}
</script>

<style lang="scss">
#previewer-cover {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20000;

    user-select: none;

    .cover {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        background: #000;

        transition: opacity .500s cubic-bezier(0.4, 0, 0.22, 1);

        .cover-top-bar {
            width: 100%;
            height: 44px;

            position: absolute;
            left: 0;
            top: 0;

            background: rgba(0, 0, 0, .3);

            .serial {
                height: 44px;
                line-height: 44px;
                padding: 0 10px;

                color: #fff;
                font-size: 14px;
                text-align: center;
            }

            .close-button {
                width: 44px;
                height: 44px;
                line-height: 44px;

                position: absolute;
                right: 0;
                top: 0;

                font-size: 24px;
                color: #fff;
                text-align: center;

                cursor: pointer;
            }
        }

        .arrow {
            width: 30px;
            height: 30px;
            line-height: 30px;

            position: absolute;
            top: 50%;

            color: #fff;
            text-align: center;

            transform: translateY(-50%);
            background: rgba(0, 0, 0, .3);

            cursor: pointer;

            &.icon-point-left {
                left: 6px;
            }
            &.icon-point-right {
                right: 6px;
            }
        }

        .loading-image {
            width: 50%;
            height: auto;

            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }

    .preview-image {
        position: fixed;
        z-index: -1;

        transition: all .500s cubic-bezier(0.4, 0, 0.22, 1);
    }
}

// 动画
.scale-leave-active {
    transition: opacity .250s cubic-bezier(0.4, 0, 0.22, 1);
    opacity: 0;
}
.scale-enter {
    opacity: 0;
}

.cover-leave-active {
    transition: opacity .250s cubic-bezier(0.4, 0, 0.22, 1);
    opacity: 0;
}
.cover-enter {
    opacity: 0;
}
</style>