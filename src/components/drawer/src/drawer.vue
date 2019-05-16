<template>
  <transition :name="'drawer-fade-' + placement">
    <div class="el-drawer-wrapper" v-show="value" @click.self="handleWrapperClick">
      <div class="el-drawer" :class="[customClass]" ref="drawer" :style="{width:w}">
        <div class="el-drawer-header">
          <div class="el-drawer-headerbtn">
            <i v-if="showClose" class="el-drawer-close el-icon el-icon-close" @click="close()"></i>
          </div>
          <span class="el-drawer-title">{{title}}</span>
          <div class="el-drawer-right-btn" v-if="showFull">
              <span @click.stop="handleFull">
                  <img src="./icon/full.svg" v-if="!fullState">
                  <img src="./icon/exit.svg" v-else>
              </span>
          </div>  
        </div>
        <div class="el-drawer-body" :style="{height:bodyHeight}">
          <slot v-if="rendered"></slot>
        </div>
        <div class="el-drawer-footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "el-drawer",
  props: {
    value: {
      type: Boolean,
      required: true
    },

    title: {
      type: String,
      default: ""
    },

    showClose: {
      type: Boolean,
      default: true
    },
    showFull:{
        type:Boolean,
        default: false
    },
    customClass: {
      type: String,
      default: ""
    },
    width: {
      type: String,
      default: "30%"
    },
    hasMask:{
        type:Boolean,
        default:true
    },
    placement:{
        type:String,
        default:'right'
    }
  },
  data() {
    return {
      visible: false,
      mask:'',
      rendered: false,
      fullState:false,
      bodyHeight:''
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
    visible(val) {
      this.$emit("input", val);
      if (val) {
          if (this.hasMask) {
              this.mask.style.display = "block";
          }
          this.rendered = val;
      } else {
           if (this.hasMask) {
              this.mask.style.display = "none";
          }
      }
    }
  },
  methods: {
    handleWrapperClick() {
      this.close();
    },
    close() {  
      this.$emit("input", false);
      this.fullState = false;
    },
    handleFull(){
        this.fullState = !this.fullState;
    }
  },
  computed:{
      w(){
          return this.fullState ? '100%' : this.width;
      }
  },
  mounted(){
    if(this.hasMask) {
        this.mask = document.createElement('div');
        this.mask.className = "el-drawer-mask";
        this.$el.after(this.mask);
    }

    this.bodyHeight = (this.$slots.footer) ? document.documentElement.clientHeight - 48 - 56 + 'px' : document.documentElement.clientHeight - 48 + 'px';

  }
};
</script>
<style lang="scss">
.el-drawer-mask{
    position: fixed;
    background: rgba($color: #000000, $alpha: 0.3);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: none;
}
.el-drawer-wrapper {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  margin: 0;
  z-index:2001;  

  .el-drawer {
    position: absolute;
    height: 100%;
    right: 0;
    top: 0;
    background: #fff;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
    transition: width .3s;
  }

  .el-drawer-header {
    height: 48px;
    line-height: 48px;
    padding: 0 24px;
    box-shadow: 0px 1px 0px 0px rgba(238, 238, 238, 1);
    text-align: center;
  }

  .el-drawer-headerbtn {
    float: left;

    .el-drawer-close {
      font-size: 13px;
      color: #333;
      cursor: pointer;
    }
  }

  .el-drawer-right-btn{
      float:right;
      img {
          width: 14px;
          height: 14px;
          cursor: pointer;
      }
  }

  .el-drawer-title {
    font-size: 16px;
    color: rgba(51, 51, 51, 1);
  }

  .el-drawer-body {
    padding: 8px;
    overflow: auto;
  }

  .el-drawer-footer{
      height: 56px;
      padding:10px;
      text-align: right;
      border-top: 1px solid rgba(238, 238, 238, 1);

  }
}

.drawer-fade-right-enter-active {
  -webkit-animation: drawer-fade-in .3s;
  animation: drawer-fade-in .3s;
}

.drawer-fade-right-leave-active {
  -webkit-animation: drawer-fade-out .3s;
  animation: drawer-fade-out .3s;
}

@keyframes drawer-fade-in {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@-webkit-keyframes drawer-fade-in {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translate3d(0);
    opacity: 1;
  }
}

@keyframes drawer-fade-out {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}

@-webkit-keyframes drawer-fade-out {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>


