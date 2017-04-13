<template>
    <div class="tofu-icon-component">
        <span 
            class="icon-font" 
            :class="iconClass" 
            :style="`font-size: ${size}px; 
                    line-height: ${size}px; 
                    color: ${color}; 
                    transform: scale(${scale})`"
            v-if="iconClass">
        </span>
        <img 
            class="icon-image" 
            :style="`width: ${size}px; 
                    height: ${size}px; 
                    transform: scale(${scale}) translate(-50%, -50%)`"
            :src="imgSrc" 
            v-else>
        </img>
    </div>
</template>

<script>
    export default {
        name: 'icon-component',

        props: {
            size: Number,
            color: String,
            iconClass: String,
            imgSrc: String
        },

        computed: {
            scale () {
                if (this.size >= 12) {
                    return 1
                } else {
                    return (this.size / 12).toFixed(2)
                }
            }
        }
    }
</script>

<style lang="scss">
    .tofu-icon-component {
        width: 100%;
        height: 100%;

        background: transparent;

        .icon-font {
            display: inline-block;
            width: 100%;
            height: 100%;

            text-align: center;
        }

        .icon-image {
            position: absolute;
            top: 50%;
        }
    }
</style>