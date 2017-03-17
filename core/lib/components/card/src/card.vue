<template>
    <div class="el-card">
        <div class="el-card-header" v-if="$slots.header || header">
            <slot name="header">{{ header }}</slot>
        </div>
        <div class="el-card-body" :style="bodyStyle">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'el-card',

        props: ['header', 'bodyStyle']
    };
</script>
