<template>
    <div id="app">
        <tofu-header @active="switchComponent"></tofu-header>
        <div class="container">
            <iu-tree :data="treeNodes" @change="handleChange"></iu-tree>
            <div class="old-component" v-if="showOld">
                <keep-alive>
                    <component :is="activeOld" :items="items" @change="handleChange">Old component</component>
                </keep-alive>
            </div>
            <div class="new-component" v-if="showNew">
                <keep-alive>
                    <component :is="activeNew">
                    </component>
                </keep-alive>
            </div>
            <div
                class="toggle iconfont"
                :class="toggleClass"
                v-if="showOld && showNew"
                @mouseout="toggleClass = 'icon-close'">
                <span
                    class="toggle-left"
                    @click.self="showOld = !showOld"
                    @mouseover="toggleClass = 'icon-left'">
                </span>
                <span
                    class="toggle-right"
                    @click.self="showNew = !showNew"
                    @mouseover="toggleClass = 'icon-right'">
                </span>
            </div>
        </div>
        <div class="socket">
            <ul>
                <li :class="{active: showOld}" @click="showOld = !showOld">old</li>
                <li :class="{active: showNew}" @click="showNew = !showNew">new</li>
            </ul>
        </div>
    </div>
</template>

<script>
// don't touch these
import TofuHeader from './view/header';

// %old%
// %new%

export default {
    name: 'App',

    components: {
        TofuHeader,
        // %old components%
        // %new components%
    },

    data () {
        return {
            toggleClass: 'icon-close',
            showOld: false,
            showNew: true,

            activeOld: '',
            activeNew: '',

            treeNodes: [{"id":"APP","img_size":"280*210","label":"APP","childNodes":[]},{"id":"M_WEBSITE","img_size":"280*210","label":"M站","childNodes":[]},{"id":"PC_WEBSITE","img_size":"530*235","label":"PC官网","childNodes":[{"id":"ARTICLE_SELECTION_RECOMMEND","img_size":"750*422","label":"文章精选推荐","checked":true},{"id":"COMMUNITY_SIDEBAR","img_size":"530*235","label":"社区侧边栏"},{"id":"INDEX_ARTICLE_RECOMMEND","img_size":"234*175","label":"首页文章推荐","checked":true},{"id":"INDEX_BANNER","img_size":"1920*460","label":"首页banner"},{"id":"RENT_SIDEBAR","img_size":"694*400","label":"我要租房侧边栏"}]},{"id":"SUPPLIER","img_size":"530*235","label":"知租侠","childNodes":[]}]
        }
    },

    watch: {
        myFields: {
            deep: true,
            handler (v) {
                console.log(v)
            }
        }
    },

    methods: {
        handleChange (arr) {
            console.log(arr)
        },
        switchComponent (compnent, index) {
            this.activeComponent = component;
        },

        next() {
            if (this.active++ > 2) this.active = 0;
        }
    }
}
</script>

<style lang="scss">
#app {
    width: 100%;
    height: 100%;
}
.header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
}
.container {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    min-height: 100%;
    padding-top: 40px;

    .old-component {
        display: inline-block;
        box-sizing: border-box;
        width: 50%;
        height: 100%;
        min-height: 100%;
        padding: 20px;

        border-right: 1px solid #ddd;

        overflow: auto;
    }

    .new-component {
        display: inline-block;
        box-sizing: border-box;
        width: 49%;
        height: 100%;
        min-height: 100%;
        padding: 20px;

        overflow: auto;
    }

    .toggle {
        width: 30px;
        height: 30px;
        line-height: 30px;

        position: fixed;
        left: calc(50% - 15px);
        top: 50%;
        z-index: 2;

        color: #aaa;
        font-size: 12px;
        text-align: center;

        border: 1px solid #ddd;
        border-radius: 50%;

        background: #fff;

        cursor: pointer;

        &:hover {
            color: #5DAC81;
            border-color: #5DAC81;
        }

        .toggle-left {
            width: 50%;
            height: 100%;

            position: absolute;
            left: 0;
        }
        .toggle-right {
            width: 50%;
            height: 100%;

            position: absolute;
            right: 0;
        }
    }
}
.socket {
    position: fixed;
    left: 0;
    bottom: 0;

    height: 40px;
    line-height: 40px;

    color: #aaa;
    text-align: center;

    border-right: 1px solid #5DAC81;
    border-top: 1px solid #5DAC81;

    li {
        display: inline-block;
        width: 50px;
        height: 50px;

        cursor: pointer;

        &.active {
            color: #5DAC81;
        }
    }
}
</style>
