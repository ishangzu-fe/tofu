<template>
    <div class="el-step"
         :style="style"
         :class="['is-' + $parent.direction]"
         @click="handleClick">
        <div class="el-step-head"
             :class="['is-' + currentStatus, { 'is-text': !icon }]">
            <div class="el-step-line"
                 :class="['is-' + $parent.direction,{ 'is-icon': icon }]">
                <i class="el-step-line-inner" :style="lineStyle"></i>
            </div>
            <span class="el-step-icon">
                <slot v-if="currentStatus !== 'success' && currentStatus !== 'error'"
                      name="icon">
                    <i v-if="icon" :class="['el-icon-' + icon]"></i>
                    <div v-else>{{ index + 1 }}</div>
                </slot>
                <i v-else :class="['el-icon-' + (currentStatus === 'success' ? 'check' : 'close')]"></i>
            </span>
        </div>
        <div class="el-step-main"
             :style="{ marginLeft: mainOffset }">
            <div class="el-step-title"
                 ref="title"
                 :class="['is-' + currentStatus]">
                <slot name="title">{{ title }}</slot>
            </div>
            <div class="el-step-description"
                 :class="['is-' + currentStatus]">
                <slot name="description">{{ description }}</slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'el-step',

        props: {
            title: String,
            icon: String,
            description: String,
            status: {
                type: String,
                default: 'wait'
            }
        },

        data() {
            return {
                index: -1,
                style: {},
                lineStyle: {},
                mainOffset: 0,
                currentStatus: this.status
            };
        },

        created() {
            this.$parent.steps.push(this);
        },

        methods: {
            handleClick(event){
                this.$emit('click',event);
            },
            updateStatus(val) {
                const prevChild = this.$parent.$children[this.index - 1];

                if (val > this.index) {
                    this.currentStatus = this.$parent.finishStatus;
                } else if (val === this.index) {
                    this.currentStatus = this.$parent.processStatus;
                } else {
                    this.currentStatus = 'wait';
                }

                if (prevChild) prevChild.calcProgress(this.currentStatus);
            },

            calcProgress(status) {
                let step = 100;
                const style = {};

                style.transitionDelay = 150 * this.index + 'ms';
                if (status === this.$parent.processStatus) {
                    step = 50;
                } else if (status === 'wait') {
                    step = 0;
                    style.transitionDelay = (-150 * this.index) + 'ms';
                }

                this.$parent.direction === 'vertical'
                        ? style.height = step + '%'
                        : style.width = step + '%';

                this.lineStyle = style;
            }
        },

        mounted() {
            const parent = this.$parent;
            const space = parent.space
                    ? parent.space + 'px'
                    : 100 / parent.steps.length + '%';

            if (parent.direction === 'horizontal') {
                this.style = { width: space };
                // this.mainOffset = -this.$refs.title.getBoundingClientRect().width / 2 + 16 + 'px';
            } else {
                if (parent.steps[parent.steps.length - 1] !== this) {
                    this.style = { height: space };
                }
            }

            const unwatch = this.$watch('index', val => {
                this.$watch('$parent.active', this.updateStatus, { immediate: true });
                unwatch();
            });
        }
    };
</script>
