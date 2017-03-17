<template lang="html">
  <div
    class="tab"
    :class="{'tab-active': active, 'no-close': tab.path === '/'}"
    draggable="true"
    @drag="onDrag($event)"
    @dragstart.stop="onDragStart($event)"
    @dragend="onDragEnd($event)"
    @drop="onDrop($event)"
    @click.stop="switchTab()"
    @contextmenu.stop.prevent="onContextMenu($event)"
    @mouseover="onMouseover($event)"
    @mouseout="onMouseout($event)"
    style="transform: translateX(0)">
    <div class="tab-link">
      <router-link class="tab-link" :to="tab.path">{{tab.name}}</router-link>
    </div>
    <transition name="close">
      <div v-if="tab.path !== '/'" v-show="isShowClose" class="tab-close el-icon-close2" @click.stop="removeSelf()"></div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      x: 0,
      translateX: 0,
      bound: {
        left: 0,
        right: 0
      },
      isShowClose: false
    }
  },
  props: {
    tab: {
      type: Object,
      required: true,
    },
    idx: {
      type: Number,
      required: true
    },
    active: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    removeSelf () {
      this.$emit('removeTab', this.idx)
    },
    switchTab () {
      if (!this.active) {
        this.$emit('switchTab', this.idx)
      }
    },
    onDragStart (e) {
      e.dataTransfer.setDragImage(document.createElement('div'), 0, 0);
      e.dataTransfer.effectAllowed = 'move';
      this.x = e.screenX
      this.switchTab()
    },
    onDrag (e) {
      this.translateX = e.screenX - this.x
      e.currentTarget.style.transform = 'translateX(' + this.translateX + 'px)'
      let rect = e.currentTarget.getBoundingClientRect()
      if (rect.left === 200) {
        this.bound.left = this.translateX
      } else if (rect.left < 200) {
        e.currentTarget.style.transform = 'translateX(' + this.bound.left + 'px)'
      } else if (rect.right === e.currentTarget.offsetParent.offsetWidth + 200) {
        this.bound.right = this.translateX
      } else if (rect.right > e.currentTarget.offsetParent.offsetWidth + 200) {
        e.currentTarget.style.transform = 'translateX(' + this.bound.right + 'px)'
      }
      this.translate(this.translateX)
    },
    onDragEnd (e) {
      // 如果放置的区域不允许，则 onDrag 的事件则获取不到鼠标的定位
      // 所以结束时需要重新计算
      let translateX = e.screenX - this.x
      this.offset = translateX >= 0 ? Math.ceil((translateX - 85) / 165) : Math.floor((translateX + 85) / 165)
      if (this.offset + this.idx < 0) {
        this.offset = - this.idx
      } else if (this.offset + this.idx >= document.querySelectorAll('.tab').length) {
        this.offset = document.querySelectorAll('.tab').length - 1 - this.idx
      }
      e.currentTarget.style.transform = 'translateX(' + this.offset * 165 +'px)'

      this.$emit('moveTab', {
        idx: this.idx,
        offset: this.offset
      })

      document.querySelectorAll('.tab').forEach(v => {
        v.style.transition = ''
        v.style.transform = 'translateX(0)'
      })
    },
    onDrop (e) {
    },
    translate (translateX) {
      this.offset = translateX >= 0 ? Math.ceil((translateX - 85) / 165) : Math.floor((translateX + 85) / 165)

      let elements = document.querySelectorAll('.tab')

      if (this.offset > 0) {
        for(let i = this.idx + this.offset; i < elements.length; i++ ) {
          elements[i].style.transform = 'translateX(0)'
        }
      } else if (this.offset < 0) {
        for(let i = this.idx + this.offset; i >= 0; i-- ) {
          elements[i].style.transform = 'translateX(0)'
        }
      } else if (this.offset === 0) {
        elements.forEach((v, idx) => {
          if (idx !== this.idx) {
            v.style.transform = 'translateX(0)'
          }
        })
      }

      if (this.offset) {
        let element = document.querySelectorAll('.tab')[this.idx + this.offset]
        if (element) {
          element.style.transform = this.offset > 0 ? 'translateX(-' + 165 + 'px)' : 'translateX(' + 165 + 'px)'
          element.style.transition = 'all .3s ease-in-out'
        }
      }
    },
    onContextMenu (e) {
      this.$emit('showContextMenu', {
        x: e.clientX,
        y: e.clientY,
        idx: this.idx
      })
    },
    onMouseover (e) {
      this.isShowClose = true
    },
    onMouseout (e) {
      this.isShowClose = false
    }
  }
}
</script>

<style lang="scss">
.tab {
  position: relative;
  margin-right: 5px;
  top: 1px;

  padding: 0 26px 0 16px;

  display: inline-block;
  line-height: 30px;
  box-sizing: border-box;
  background: linear-gradient(-180deg, #EEEEEE 0%, #E6E6E6 100%);
  border: 1px solid #eee;
  border-bottom: none;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  cursor: pointer;
  text-align: center;

  &.no-close {
    padding: 0 16px;
  }

  a {
    text-decoration: none;
    color: #000;
  }

  &.tab-active {
    background-color: #fafafa;
    z-index: 1;
  }

  .tab-close {
    position: absolute;
    right: 10px;
    top: calc(50% + 1px);
    transform: translateY(-50%) scale(.75);
    font-size: 12px;
    z-index: 2;
  }

  .tab-link {
    display: inline-block;
    height: 100%;
    font-size: 12px;
  }

  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: transparent;
  }

  .close-enter-active, .close-leave-active {
    transition: all .5s ease-in-out;
  }
  .close-enter, .close-leave-active {
    opacity: 0;
    transform: translateY(-50%) scale(0.1);
  }
}
</style>
