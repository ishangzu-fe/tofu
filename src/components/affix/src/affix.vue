<template>
    <div>
        <div :class="classes" :style="styles">
            <slot></slot>
        </div>
    </div>
</template>
<script>
      import { on, off } from '@/utils/dom';
      const perfixCls = 'i-affix';

      function getScroll(target,top){
          const prop = top ? 'pageYOffset' : 'pageXOffset'
          const method = top ? 'scrollTop' : 'scrollLeft';

          let ret = target[prop];

          if(typeof ret !== 'number'){
              ret = window.document.documentElement[method];
          }

          return ret;
      }

      function getOffset(element){
          const rect = element.getBoundingClientRect();

          const scrollTop = getScroll(window,true);
          const scrollLeft = getScroll(window);

          const docEl = window.document.body;
          const clientTop = docEl.clientTop || 0;
          const clinetLeft = docEl.clinetLeft || 0;

          return {
              top: rect.top + scrollTop - clientTop,
              left: rect.left + scrollLeft - clinetLeft
          }
      }

      export default {
          name:'el-affix',
          props:{
              offsetTop:{
                  type:Number,
                  default:0
              }
          },
          data(){
              return {
                  affix: false,
                  styles: {}
              }
          },
          computed:{
              classes(){
                  return [
                      {
                          [`${perfixCls}`]:this.affix
                      }
                  ]
              }
          },
          methods:{
              handleScroll(){
                  
                const affix = this.affix;
                const scrollTop = getScroll(window,true);
                const elOffset = getOffset(this.$el);
                // Fixed Top
                if ((elOffset.top - this.offsetTop) < scrollTop && !affix) {
                    this.affix = true;
                    this.styles = {
                        top: `${this.offsetTop}px`,
                        left: `${elOffset.left}px`,
                        width: `${this.$el.offsetWidth}px`
                    };
                    this.$emit('change', true);
                } else if ((elOffset.top - this.offsetTop) > scrollTop && affix) {
                    this.affix = false;
                    this.styles = null;
                    this.$emit('change', false);
                }
                
              }
          },
          mounted(){
              on(window,'scroll',this.handleScroll);
              on(window,'resize',this.handleScroll);              
          },
          beforeDestory(){
              off(window,'scroll',this.handleScroll);
              off(window,'resize',this.handleScroll);
          }
      }
</script>
<style scoped>
    .i-affix{
        position:fixed;
        z-index:99999;
    }
</style>