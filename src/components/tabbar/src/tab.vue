<template lang="html">
  <div
    class="vvc-tab"
    :class="{transition: moving, 'vvc-tab-active': tab.state.active}"
    :style="{width: style.width, 'background-color': bgc, 'z-index': zIndex}"
    @click.stop="activate"
    :draggable="tab._tab_.id !== 'Tab_0'"
    @dragstart="dragStart"
    @drag="dragging"
    @dragend="dragEnd">
    {{ tab._tab_.label }}
    <span class="vvc-tab-close" @click.stop="close" v-if="tab._tab_.id !== 'Tab_0'"></span>
  </div>
</template>

<style lang="scss">
.vvc-tab {
  position: relative;
  bottom: -1px;
  margin-right: 6px;

  display: inline-block;

  height: 30px;
  line-height: 30px;
  padding-left: 10px;

  border: 1px solid rgb(221, 221, 221);
  border-bottom: none;

  background-image: linear-gradient(-180deg, #EEEEEE 0%, #E6E6E6 100%);
  box-shadow: inset 0 0 0 0 #DCDCDC, inset 0 0 0 0 #DCDCDC, inset 0 0 0 0 #DCDCDC;

  font-size: 12px;

  cursor: pointer;

  &.vvc-tab-active {
    background-image: linear-gradient(-180deg, #FFFFFF 0%, #F9F9F9 100%);
    box-shadow: 0 0 0 0 #DCDCDC, 0 0 0 0 #DCDCDC, inset 0 0 0 0 #DCDCDC, inset 0 0 0 0 #FFFFFF;
  }

  &:last-child {
    margin-right: 0;
  }

  &.transition {
    transition: all .3s ease-in;
  }

  .vvc-tab-close {
    position: absolute;
    right: 8px;
    top: 11px;

    width: 8px;
    height: 8px;

    background-image: url(../../../assets/close.svg);
    background-repeat: no-repeat;
    background-position: center;

    cursor: pointer;
  }
}
</style>

<script>
import tabbarManager from './tabbarManager'

export default {
  props: {
    tab: {
      required: true,
      validator () {
        return true
        // TODO 验证
        // {
        //    _tab_: {
        //      id,
        //      name,
        //      label,
        //      path
        //    },
        //    state: {
        //      idx,
        //      active
        //      etc.
        //    }
        // }
      }
    },
    useRouter: {
        required: false
    },
    styleConfig: {
        required: false
    }
  },

  data () {
    return {
      _tab_: {
        id: null,
        name: null,
        label: null
      },
      style: {
        width: '165px',
        activeBgc: '#fff',
        inactiveBgc: '#eee'
      },
      translateX: 0, // 初始移动距离
      position: {
        startX: 0,
        xWhenLeftEqual: 0,
        xWhenRightEqual: 0
      },
      moving: false
    }
  },

  computed: {
    bgc () {
      let rt = this.tab.state.active ? this.style.activeBgc : this.style.inactiveBgc
      return rt
    },
    zIndex () {
      let rt = this.tab.state.active ? 1 : 0
      return rt
    }
  },

  methods: {
    /**
     * 拖拽开始
     *
     * @param {MouseEvent} e
     */
    dragStart (e) {
      e.dataTransfer.setDragImage(document.createElement('div'), 0, 0); // 设置拖动图片
      e.dataTransfer.effectAllowed = 'move'; // 设置拖动的效果 -> 指针图标
      this.position.startX = e.pageX
      this.activate() // 拖拽哪个，激活哪个
    },

    /**
     * 拖拽时事件
     *
     * @param {MouseEvent} e
     */
    dragging (e) {
      this.translateX = e.pageX - this.position.startX
      this._translate(1, this.translateX)

      const parentRect = this.$parent.$el.getBoundingClientRect()
      const parentLeft = parentRect.left
      const parentRight = parentRect.right

      const selfRect = this.$el.getBoundingClientRect()
      const selfLeft = selfRect.left
      const selfRight = selfRect.right

      // 当父子左/右边界对齐时，记录移动量
      if (selfLeft === parentLeft) {
        this.position.xWhenLeftEqual = this.translateX
      } else if (selfRight === parentRight) {
        this.position.xWhenRightEqual = this.translateX
      }

      if (selfLeft < parentLeft) {
        // 若 Tab 左边界超过容器左边界
        this.translateX = this.position.xWhenLeftEqual
      } else if (selfRight > parentRight) {
        // 若 Tab 右边界超过容器右边界
        this.translateX = this.position.xWhenRightEqual ? this.position.xWhenRightEqual : this.translateX
      }

      this._translate(1, this.translateX)

      // 在拖拽源移动时，其他 tab 也需要同时进行移动
      let to
      let distance
      const from = this.tab.state.idx
      if (this.style.width !== 'relative') { // 如果 Tab 宽度固定
        distance = parseInt(this.style.width) // 移动距离即 Tab 的宽度
        const width = distance
        if (this.translateX > width / 2) {
          to = this.tab.state.idx + Math.floor((this.translateX + width / 2) / width)
        } else if (this.translateX < - width / 2) {
          to = this.tab.state.idx + Math.ceil((this.translateX - width / 2) / width)
        } else {
          to = from
        }
      } else { // 如果 Tab 宽度不固定
        // TODO
      }

      tabbarManager.bus.$emit('tab_translate', {
        from,
        to,
        distance
      })
    },

    /**
     * 拖拽结束
     *
     * @param {MouseEvent} e
     */
    dragEnd (e) {
      let translateX = e.pageX - this.position.startX

      // TODO
      // 结束时重新计算位置, 按索引进行放置
      let to
      const from = this.tab.state.idx
      if (this.style.width !== 'relative') { // 如果 Tab 宽度固定时
        const width = parseInt(this.style.width)
        if (this.translateX > width / 2) {
          to = this.tab.state.idx + Math.floor((this.translateX + width / 2) / width)
        } else if (this.translateX < - width / 2) {
          to = this.tab.state.idx + Math.ceil((this.translateX - width / 2) / width)
        } else {
          to = from
        }
      } else { // 如果宽度不固定时
        // TODO
      }

      tabbarManager.bus.$emit('tab_dragend', {
        from,
        to
      })
    },

    /**
     * 移动 Tab ，相对当前位置
     *
     * @param {String} direction 1 | -1 ，1 为向右，-1 为向左
     * @param {Number} distance 需要移动的距离
     * @param {Number} offset 偏移的 Tab 的数量
     */
    _translateRel (direction, distance, offset) {
      if (offset) {
        // TODO 根据偏移量来移动
      } else {
        this.$el.style.transform = 'translateX(' + (this.translateX + direction * distance) + 'px)'
      }
    },

    /**
     * 移动 Tab ，绝对位置
     *
     * @param {String} direction 1 | -1 ，1 为向右，-1 为向左
     * @param {Number} distance 需要移动的距离
     * @param {Number} offset 偏移的 Tab 的数量
     */
    _translate (direction, distance, offset) {
      if (offset) {
        // TODO 根据偏移量来移动
      } else {
        this.$el.style.transform = 'translateX(' + direction * distance + 'px)'
      }
    },

    /**
     * 当其他 Tab 移动时，判断自己是否需要移动
     */
    otherHasMoved (params) {
      const idx = this.tab.state.idx

      if (params.from === idx) {
        return
      } else {
        this.moving = true
      }
      const from = params.from
      const to = params.to
      const direction = from - to > 0 ? 'left' : from === to ? 'reset' : 'right'

      if (direction === 'left') {
        if (idx > from || idx < to) {
          this._translate(0, 0)
        } else {
          this._translateRel(1, params.distance)
        }
      } else if (direction === 'right') {
        if (idx < from || idx > to) {
          this._translate(0, 0)
        } else {
          this._translateRel(-1, params.distance)
        }
      } else {
        this._translate(0, 0)
      }
    },

    /**
     * 关闭
     */
    close () {
      tabbarManager.bus.$emit('tab_close', this.tab.state.idx)
    },

    /**
     * 激活
     */
    activate () {
        if (this.useRouter) {
            this.$router.push(this.tab._tab_.path)
        }
        // else {}

        tabbarManager.bus.$emit('tab_activate', this.tab.state.idx, this.$el.getBoundingClientRect())
    },

    /**
     * 当
     */
    reset () {
      this.moving = false
      this._translate(0, 0)
      this.translateX = 0
    }
  },

  created () {
      if (this.styleConfig) {
          Object.assign(this.style, this.styleConfig)
      }
      // else {}

      // hotfix TODO
      if (this.useRouter) {
        this.$watch('tab', v => {
          if (v.state.active) {
              this.$router.push(this.tab._tab_.path)
          }
      }, {
          deep: true
      })
      }
  },

  mounted () {
    tabbarManager.bus.$on('tab_dragend', this.reset)

    tabbarManager.bus.$on('tab_translate', function (params) {
      this.otherHasMoved(params)
    }.bind(this))

    tabbarManager.bus.$emit('tab_mounted') // 挂载完成事件，当所有 tab 挂载后，tabbar 会进行一次判断, 判断是否可以滚动

  },

  destroyed () { // TODO 删除时，触发了两次
    tabbarManager.bus.$emit('tm_change')

    tabbarManager.bus.$emit('tm_destroy', this.$route.name)
  }
}
</script>
