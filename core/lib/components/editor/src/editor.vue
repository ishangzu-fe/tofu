<template>
    <div class="i-editor" :style="{'z-index':zIndex}">
        <div class="toolbar" :style="{'z-index':zIndex+1}" ref="toolbar">
            <ul>
                <template v-for="module in modules">
                    <li v-if="module.show" :title="locale[module.i18n]"
                        @click="activeModule(module)">
                        <span class="icon" :class="module.icon"></span>
                    </li>
                </template>
            </ul>
            <div class="dashboard" v-show="dashboard" :style="dashboardStyle">
                <div v-if="dashboard" :is="dashboard" keep-alive></div>
            </div>
        </div>
        <div class="content" ref="content" contenteditable="true" @click="toggleDashboard(dashboard)"
             :style="contentStyle">
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            content: {
                type: String,
                default: ""
            },
            height: {
                default: 300,
                validator (val) {
                    return val >= 100
                }
            },
            zIndex: {
                type: Number,
                default: 1000
            },
            autoHeight: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                dashboard: null,
                dashboardStyle: {},
                iContent:this.content
            }
        },
        watch: {
            iContent(val) {
                let content = this.$refs.content.innerHTML;
                if (val != content) {
                    this.content = val;
                }
            },
            dashboard(val){
                if (val) {
                    this.computeDashboardStyle()
                }
            }
        }
        ,
        computed: {
            contentStyle(){
                let style = {}

                if (!this.autoHeight) {
                    style.height = this.height + 'px'
                    return style;
                }
                style["min-height"] = this.height + 'px'
                return style
            }
        },
        methods: {
            computeDashboardStyle(){
                this.dashboardStyle = {'max-height': this.$refs.content.clientHeight + 'px'}
            },
            getContentElement(){
                return this.$refs.content
            },
            setContent(val){
                this.iContent = val;
                this.$refs.content.innerHTML = val;
            },
            toggleDashboard(dashboard){
                this.dashboard == dashboard ? this.dashboard = null : this.dashboard = dashboard
            },
            execCommand(command, arg){
                this.restoreSelection()
                document.execCommand(command, false, arg)
                this.iContent = this.$refs.content.innerHTML
                this.dashboard = null
            },
            getCurrentRange(){
                return this.range
            },
            saveCurrentRange(){
                let selection = window.getSelection ? window.getSelection() : document.getSelection()
                let range = selection.rangeCount ? selection.getRangeAt(0) : null
                if (!range) {
                    return
                }
                if (this.$refs.content.contains(range.startContainer) &&
                        this.$refs.content.contains(range.endContainer)) {
                    this.range = range
                }
            },
            restoreSelection(){
                let selection = window.getSelection ? window.getSelection() : document.getSelection()
                selection.removeAllRanges()
                if (this.range) {
                    selection.addRange(this.range)
                } else {
                    let content = this.$refs.content
                    let div = document.createElement("div")
                    let range = document.createRange()
                    content.appendChild(div)
                    range.setStart(div, 0)
                    range.setEnd(div, 0)
                    selection.addRange(range)
                }
            },
            activeModule(module){
                if (typeof module.handler == "function") {
                    module.handler(this)
                    return
                }
                if (module.hasDashboard) {
                    this.toggleDashboard('dashboard-' + module.name)
                }
            }
        },
        mounted(){
            let content = this.$refs.content;

            this.modules.forEach(module => {
                if (typeof module.init == "function") {
                    module.init(editor)
                }
            });

            content.innerHTML = this.content
            content.addEventListener("mouseup", this.saveCurrentRange, false)
            content.addEventListener("keyup", this.saveCurrentRange, false)
            content.addEventListener("mouseout", this.saveCurrentRange, false)
            content.addEventListener("keyup",  () => {
                this.iContent = this.$refs.content.innerHTML
            }, false)

        },
        beforeDestroy(){
            let editor = this
            window.removeEventListener("touchend", editor.touchHandler)
            editor.modules.forEach(function (module) {
                if (typeof module.destroyed == "function") {
                    module.destroyed(editor)
                }
            })
        }
    }
</script>
