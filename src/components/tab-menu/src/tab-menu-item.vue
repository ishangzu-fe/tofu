<template>
    <div class="el-tab-menu-item" :class="{'active': active}" @click.stop="switchMenu(tab.id)">
        <div class="el-tab-menu-item-link">
            <router-link class="el-tab-menu-item-link" :to="tab.path">{{tab.name}}</router-link>
        </div>
        <transition name="close">
            <div class="el-tab-menu-close el-icon-close2" ></div>
        </transition>
    </div>
</template>
<script>
    import emitter from '../../../utils/emitter'


    export default {
        props:{
            tab:{
                type:Object,
                required:true
            },
            active:{
                type:Boolean,
                required:true
            }
        },
        mixins: [emitter],
        methods:{
            switchMenu(val){
                this.broadcast('i-tab-menu', 'moveTab', [val]);

            }
        }
    }
</script>