<template lang="html">
  <div class="vvc-tabbar" ref="bg">
    <span class="vvc-ctrl-btn btn-left" v-show="canScroll" @click="scroll($event, 'left')">&lt;</span>
    <div class="vvc-tabbar-container" ref="container" @wheel.stop="scroll" @dragover.prevent="">
      <Tab v-for="tab in tabs" :tab="tab" :useRouter="config.useRouter" :styleConfig="config.style" />
    </div>
    <span class="vvc-ctrl-btn btn-right" v-show="canScroll" @click="scroll($event, 'right')">&gt;</span>
  </div>
</template>

<style lang="scss">
.vvc-tabbar {
  position: relative;

  box-sizing: border-box;
  width: calc(100% - 200px);
  height: 100%;

  // overflow: hidden;

  -webkit-user-select: none;
  user-select: none;

  .vvc-tabbar-container {
    position: absolute;
    bottom: 0px;

    box-sizing: border-box;
    height: 30px;
    padding: 0 10px;

    white-space: nowrap;

    transition: all .3s ease-in-out;
  }

  .vvc-ctrl-btn {
    position: absolute;
    bottom: 0;
    z-index: 1;

    width: 10px;
    height: 30px;
    line-height: 30px;

    color: #ccc;

    cursor: pointer;

    &.btn-left {
      left: 0;
    }
    &.btn-right {
      right: 0;
    }
  }
}
</style>

<script>
import Tab from './tab'
import tabbarManager from './tabbarManager'

export default {
    props: {
        config: {
            validator () {
                return true // TODO
                // {
                //   style,
                //   useRouter
                // }
            }
        }
    },

  data () {
    return {
      tabs: [], // Tab 数组
      activeTabId: null,
      canScroll: false, // 能否滚动
      canMove: true,
      canMoveToLeft: true,
      canMoveToRight: false,
      translateX: 0, // 实际移动的偏移量
      isInited: false
    }
  },

  methods: {
    /**
     * 判断 tabbar 是否符合滚动条件
     *
     * 判断的时机：触发 'change' 事件时
     * 条件：容器的宽度大于 bar 的宽度
     *
     * @return {Boolean}
     */
    judgeCanScroll () {
        if (!this.$refs.container) {
            return false
        }

      const containerWidth = this.$refs.container.getBoundingClientRect().width
      const bgWidth = this.$refs.bg.getBoundingClientRect().width

      if (containerWidth > bgWidth) {
        return true
      } else {
        return false
      }
    },

    /**
     * 在 滚动 | 不能滚动 两种状态之间切换
     *
     * @param {Boolean} canScroll
     */
    toggleScroll (canScroll) {
      this.canScroll = canScroll

      if (!canScroll) {
        this.translateX = 0
        this.translate()
      }

      if (canScroll && this.isInited === false) {
        // 容器向右移动10px，空出左按钮距离
        this.translateX = 10
        this.isInited = true
        this.translate()
      }
      // else {}
    },

    /**
     * 判断是否符合滚动条件并进行切换
     */
    judgeAndToggle () {
      this.toggleScroll(this.judgeCanScroll())
    },

    /**
     * 鼠标滚轮事件
     */
    scroll (e, direc) {
      if (!this.canScroll || !this.canMove) {
        return
      } else {
        this.canMove = false // 上锁
      }

      // TODO 是否可以缓存这些常量？
      const bgRect = this.$refs.bg.getBoundingClientRect()
      const bgWidth = bgRect.width // 获取 tabbar 背景宽度
      const containerRect = this.$refs.container.getBoundingClientRect()
      const containerWidth = containerRect.width // 获取 tabbar 容器宽度

      const step = 100
      const btnWidth = 10 // 按钮宽度
      const largetFromRight = 20
      const largestTanslateRight = 10
      const largestTanslateLeft = bgWidth - containerWidth - btnWidth

      if (e.deltaY >= 100 || direc === 'right') { // 滚轮向下，容器向左移动 100px
        let offsetRight = bgRect.right - containerRect.right + step // 向左移动 100px 后容器距离 bg 右边界距离

        if (offsetRight > largetFromRight) {
          this.canMoveToLeft = false
          this.translateX = largestTanslateLeft
        } else {
          this.canMoveToLeft = true
          this.translateX -= step
        }
      } else if (e.deltaY <= -100 || direc === 'left') { // 滚轮向上，容器向右移动 100px
        if (this.translateX + step > largestTanslateRight) {
          this.canMoveToRight = false
          this.translateX = largestTanslateRight
        } else {
          this.canMoveToRight = true
          this.translateX += step
        }
      }

      this.translate()

      // 解锁
      setTimeout(() => {
        this.canMove = true
      }, 300)
    },

    /**
     * 当激活某个Tab时，判断是否需要移动容器
     *
     * @param {Number} tabIdx
     */
    moveToTab (tabIdx, tabRect) {
      let bgRect = this.$refs.bg.getBoundingClientRect()
      const btnWidth = 10
      const padding = 10
      if (tabRect.left < bgRect.left) {
        this.translateX += bgRect.left - tabRect.left + btnWidth + padding
      } else if (tabRect.right > bgRect.right) {
        this.translateX -= tabRect.right - bgRect.right + btnWidth + padding
      }

      this.translate()
    },

    /**
     * 移动 Tabbar
     */
    translate () {
        if (!this.$refs.container) {
            return false
        }

      this.$refs.container.style.transform = 'translateX('+ this.translateX +'px)'
    }
  },

  components: {
    Tab
  },

  created () {
    // 获取 Tabs 数据
    this.tabs = tabbarManager.getTabs()
  },

  mounted () {
    tabbarManager.bus.$on('tm_change', function () {
    //   console.log('Fire change event!')
      this.tabs = tabbarManager.getTabs() // 每当触发 change 事件，主动更新 tabs 数组

      this.judgeAndToggle()
    }.bind(this))

    tabbarManager.bus.$on('tab_activate', this.moveToTab)

    // 当调整窗口大小时，判断是否能够滚动
    window.onresize = function () {
      this.judgeAndToggle()
    }.bind(this)

    // 当所有Tab挂载完成时，进行一次判断，判断是否能够滚动
    tabbarManager.bus.$on('tm_allMounted', this.judgeAndToggle)

    tabbarManager.bus.$on('tm_closeAllTabs', () => {
        this.$router.push('/app_service/dashboard')
    })

    if (this.config.useRouter) {
        tabbarManager.bus.$emit('useRouter')
    }

    if (this.config.autoRestore) {
        tabbarManager.bus.$emit('autoRestore')

        tabbarManager.restore()
    }
  }
}
</script>
