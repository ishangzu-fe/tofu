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
              let: rect.left + scrollLeft - clinetLeft
          }
      }

      export default {
          name:'el-affix',
          props:{
              offsetTop:{
                  type:Number,
                  default:0
              },
              offsetBottom:{
                  type:Number
              }
          },
          data(){
              return {
                  affix: false,
                  styles: {}
              }
          },
          computed:{
              offsetType(){
                  let type = 'top';
                  if(this.offsetBottom >= 0){
                      type = 'bottom';
                  }

                  return type;
              },
              classes(){
                  return [
                      {
                          [`${perfixCls}`]:this.affix
                      }
                  ]
              }
          },
          method:{
              handleScroll(){
                const affix = this.affix;
                const scrollTop = getScroll(window,true);
                const elOffset = getOffset(this.$el);
                const windowHeight = windowHeight;
                const elHeight = this.$el.getElementByTagName('div')[0].offsetHeight;

                // Fixed Top
                if ((elOffset.top - this.offsetTop) < scrollTop && this.offsetType == 'top' && !affix) {
                    this.affix = true;
                    this.styles = {
                        top: `${this.offsetTop}px`,
                        left: `${elOffset.left}px`,
                        width: `${this.$el.offsetWidth}px`
                    };
                    this.$emit('on-change', true);
                } else if ((elOffset.top - this.offsetTop) > scrollTop && this.offsetType == 'top' && affix) {
                    this.affix = false;
                    this.styles = null;
                    this.$emit('on-change', false);
                }
                // Fixed Bottom
                if ((elOffset.top + this.offsetBottom + elHeight) > (scrollTop + windowHeight) && this.offsetType == 'bottom' && !affix) {
                    this.affix = true;
                    this.styles = {
                        bottom: `${this.offsetBottom}px`,
                        left: `${elOffset.left}px`,
                        width: `${this.$el.offsetWidth}px`
                    };
                    this.$emit('on-change', true);
                } else if ((elOffset.top + this.offsetBottom + elHeight) < (scrollTop + windowHeight) && this.offsetType == 'bottom' && affix) {
                    this.affix = false;
                    this.styles = null;
                    this.$emit('on-change', false);
                }
              }
          },
          mounted(){
              on(window,'scroll',this.handleScroll);
              on(window,'resize',this.handleScroll)
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