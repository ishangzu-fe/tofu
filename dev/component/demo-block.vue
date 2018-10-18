<template>
    <div class="demo-block">
        <h6>{{title}}</h6>
        <p class="desc">{{desc}}</p>
        <div class="module">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'demo-block',
        props: {
            title: {
                type: String,
                default: ''
            },
            desc: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style>
    .demo-block {
        /* margin-bottom: 20px; */
    }
    
    .demo-block h6 {
        margin: 15px 0 15px;
        color: #1f2d3d;
        font-weight: 400;
        margin-bottom: 10px;
        font-size: 22px;
    }
    
    .demo-block .desc {
        /* font-size: 14px; */
        /* color: #5e6d82; */
    }
    
    .module {
        padding: 24px;
        border: 1px solid #eaeefb;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        transition: .2s;
    }

    .module:after{
        content: " ";
        display: block;
        clear: both;
        height: 0;
    }
    
    .module .wrapper {
        margin-bottom: 20px;
    }
    
    .module .wrapper:last-child {
        margin-bottom: 0;
    }
</style>

