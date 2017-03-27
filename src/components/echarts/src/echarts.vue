<template>
    <div :class="classname" >
        <slot></slot>
    </div>
</template>

<script>
    import echarts from 'echarts';
    import chinaJson from './json/china.json';

    echarts.registerMap('china',chinaJson);

    export default{
        props:{
            options:{
                type:Object
            },
            classname:{
                type:String,
                default:function () {
                    return 'el-echarts'
                }
            },
            eClick:Function,
            resize:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return {
                _vue_charts:null
            }
        },
        watch:{
            'options':{
                handler(val,oldVal){
                    this.updateCharts();
                },
                deep:true
            }
        },
        mounted(){
            this.renderCharts();
            this.eventBind();
        },
        methods:{
            renderCharts(){
                this._vue_charts = echarts.init(this.$el);
                if(this.options){
                    this._vue_charts.setOption(this.options);
                }
            },
            updateCharts(){
                this._vue_charts.setOption(this.options);
            },
            eventBind(){
                if(this.eClick){
                    this._vue_charts.on('click',(params) =>{
                        this.eClick(this._vue_charts,params)
                    });
                }
            }
        }

    }

</script>