<template lang="html">
  <div
    class="tabbar"
    :class="{ 'can-scroll': canScroll }"
    @dragover.prevent=""
    @wheel.stop="onWheel($event)">
    <span class="button el-icon-arrow-left" @click.stop="onClickButton(0)"></span>
    <div class="tabbar-main" ref="main">
      <transition-group ref="wrapper" name="slide">
        <Tab
          v-for="(tab, idx) in tabs"
          :tab="tab"
          :idx="idx"
          :key="tab.path"
          :active="activeTabIdx === idx"
          @destory="transitionAfterDestory($event)"
          @removeTab="removeTab($event)"
          @switchTab="switchTab($event)"
          @showContextMenu="showContextMenu($event)"
          @moveTab="moveTab($event)"/>
      </transition-group>
    </div>
    <span class="button el-icon-arrow-right" @click.stop="onClickButton(1)"></span>
    <my-context-menu
      :items="contextMenuItems"
      :x="contextMenuX"
      :y="contextMenuY"
      v-if="isShowContextMenu"
      @closeContextMenu="closeContextMenu()"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Tab from './Tab'

export default {
  data () {
    return {
      canScroll: false,
      canMoveBar: 1,
      contextMenuItems: [
        { name: '关闭其他标签', handler: this.removeOthers },
        { name: '关闭所有标签', handler: this.removeAllTabs }
      ],
      isShowContextMenu: false,
      contextMenuX: 0,
      contextMenuY: 0,
      contextMenuIdx: undefined
    }
  },
  props: {
    useVuex: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      tabs: state => state.tabs.tabs,
      activeTabIdx: state => state.tabs.activeTabIdx
    })
  },
  methods: {
    addTab (tab) {
      if (this.useVuex) {
        this.$store.commit('addTab', tab)
        setTimeout(() => {
          this.order(this.activeTabIdx)
        }, 100)
      } else {

      }
    },
    removeTab (idx) {
      if (this.useVuex) {
        if (this.activeTabIdx === idx) {
          if (this.tabs[idx - 1]) {
            this.$router.push({ path: this.tabs[idx - 1].path })
          } else if (this.tabs[idx + 1]) {
            this.$router.push({ path: this.tabs[idx + 1].path })
          } else {
            this.$router.push({ path: '/' })
          }
        }

        this.$store.commit('removeTab', idx)
        this.order()
      } else {

      }
    },
    activeTab (idx) {
      if (this.useVuex) {
        this.$store.commit('activeTab', idx)
        this.order(idx)
      } else {

      }
    },
    switchTab (idx) {
      this.$router.push({ path: this.tabs[idx].path })
    },
    moveTab (arg) {
      if (this.useVuex) {
        this.$store.commit('moveTab', arg)
      } else {

      }
    },
    order (idx) {
      if (!idx) {
        idx = this.activeTabIdx
      }

      let translateX = getComputedStyle(this.$refs.main).transform.match(/([0-9]*)\,\s0\)$/) && parseInt(getComputedStyle(this.$refs.main).transform.match(/([0-9-]*)\,\s0\)$/)[1])
      let barWidth = this.$el.clientWidth
      let tab = this.$refs.wrapper.$children[idx].$el
      let tabWidth = tab.offsetWidth
      let curBarPos = tab.offsetLeft + translateX
      if (curBarPos > barWidth - (tabWidth + 25)) {
        this.$refs.main.style.transform = 'translateX('+ (translateX + (barWidth - (tabWidth + 25) - curBarPos)) +'px)'
      } else if (this.canScroll && curBarPos < 10) {
        this.$refs.main.style.transform = 'translateX('+ (translateX + (10 - curBarPos)) +'px)'
      }

      // 最后一个tab距离右边不能超过20px
      if (this.canScroll && ((barWidth - (this.$refs.wrapper.$el.offsetWidth + translateX)) > 20)) {
        this.$refs.main.style.transform = 'translateX('+ (translateX + (barWidth - ((this.tabs.length - 1)*tabWidth + translateX + tabWidth) - 20)) +'px)'
      }
    },
    onClickButton (mode) {
      // 上锁
      if (!this.canMoveBar) {
        return
      } else {
        this.canMoveBar = 0
      }

      let translateX = getComputedStyle(this.$refs.main).transform.match(/([0-9]*)\,\s0\)$/) && parseInt(getComputedStyle(this.$refs.main).transform.match(/([0-9-]*)\,\s0\)$/)[1])
      let t
      if (!mode) {
        t = translateX + 100
        if (t > 10) {
          t = 10
        }
      } else {
        t = translateX - 100

        let barWidth = this.$el.clientWidth
        let tab = this.$refs.wrapper.$children[this.tabs.length - 1].$el
        let tabWidth = tab.offsetWidth
        // let curBarPos = tab.offsetLeft + translateX
        if ((barWidth - (this.$refs.wrapper.$el.offsetWidth + t)) > 10) {
          t = (translateX + (barWidth - ((this.tabs.length - 1) * tabWidth + translateX + tabWidth) - 10))
        }
      }
      this.$refs.main.style.transform = 'translateX('+ t +'px)'

      // 解锁
      setTimeout(() => {
        this.canMoveBar = 1
      }, 300)
    },
    onWheel (e) {
      if (!this.canScroll) {
        return
      }

      // 上锁
      if (!this.canMoveBar) {
        return
      } else {
        this.canMoveBar = 0
      }

      let translateX = getComputedStyle(this.$refs.main).transform.match(/([0-9]*)\,\s0\)$/) && parseInt(getComputedStyle(this.$refs.main).transform.match(/([0-9-]*)\,\s0\)$/)[1])
      let t
      let barWidth = this.$el.clientWidth
      let tab = this.$refs.wrapper.$children[this.tabs.length - 1].$el
      let tabWidth = tab.offsetWidth
      if (e.deltaY >= 100) {
        t = translateX - 100
        if ((barWidth - (this.$refs.wrapper.$el.offsetWidth + t)) > 10) {
          t = (translateX + (barWidth - ((this.tabs.length - 1) * tabWidth + translateX + tabWidth) - 10))
        }
      } else if (e.deltaY <= -100) {
        t = translateX + 100
        if (t > 10) {
          t = 10
        }
      }
      this.$refs.main.style.transform = 'translateX('+ t +'px)'

      // 解锁
      setTimeout(() => {
        this.canMoveBar = 1
      }, 300)
    },
    showContextMenu (e) {
      this.contextMenuX = e.x
      this.contextMenuY = e.y
      this.contextMenuIdx = e.idx
      this.isShowContextMenu = true
    },
    closeContextMenu () {
      this.isShowContextMenu = false
    },
    removeOthers () {
      this.$router.push({ path: this.tabs[this.contextMenuIdx].path })
      this.$store.commit('removeOthers', this.contextMenuIdx)
      this.isShowContextMenu = false
    },
    removeAllTabs () {
      this.$router.push({ path: '/' })
      this.$store.commit('removeAllTabs')
      this.isShowContextMenu = false
    },
    transitionAfterDestory (idx) {
      // for (let i = idx + 1; i < this.$refs.main.querySelectorAll('.tab').length; i++) {
      //   this.$refs.main.querySelectorAll('.tab')[i].style.transform = 'translateX(-165px)'
      //   this.$refs.main.querySelectorAll('.tab')[i].style.transition = 'all .3s'
      // }
      //
      // setTimeout(function () {
      //   for (let i = idx + 1; i < this.$refs.main.querySelectorAll('.tab').length; i++) {
      //     this.$refs.main.querySelectorAll('.tab')[i].style.transform = 'translateX(0px)'
      //     this.$refs.main.querySelectorAll('.tab')[i].style.transition = ''
      //   }
      // }.bind(this), 300)
    },
    isCanScroll () {
      if (this.$refs.wrapper.$el.offsetWidth > this.$el.clientWidth) {
        return true
      } else {
        this.$refs.main.style.transform = 'translateX(0px)'
        return false
      }
    }
  },
  components: {
    Tab
  },
  watch: {
    '$route' (newV, oldV) {
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].path === newV.path) {
          this.activeTab(i)
          return
        }
      }
      this.addTab({
        name: newV.name,
        path: newV.path
      })
    },
    tabs (newV, oldV) {
      this.canScroll = this.isCanScroll()
    },
    activeTabIdx (newV, oldV) {
      // this.order(newV)
    }
  },
  mounted () {
    window.onresize = function () {
      this.canScroll = this.isCanScroll()
    }.bind(this)

    this.canScroll = this.isCanScroll()
    this.order(this.currentTabIdx)
  }
}
</script>

<style lang="scss">
.tabbar {
  text-align: left;
  // border-bottom: 1px solid rgb(236, 236, 236);
  white-space: nowrap;
  overflow: hidden;

  .tabbar-main {
    transition: all .3s ease-out;
  }

  &.can-scroll {
    .tabbar-main {
      transform: translateX(10px);
    }
    .button {
      display: inline-block;
    }
  }

  .button {
    display: none;
    position: absolute;
    top: 2px;
    z-index: 2;

    color: #aaa;
    font-size: 12px;
    height: 31px;
    line-height: 31px;
    width: 15px;
    cursor: pointer;
    transform: scale(.85);

    &:hover {
      color: #000;
    }

    &.el-icon-arrow-left {
      left: 0;
      padding-left: 4px;
    }

    &.el-icon-arrow-right {
      right: 0;
    }
  }

  .slide-enter-active, .slide-leave-active {
    transition: all .3s;
  }
  .slide-enter, .slide-leave-active {
    opacity: 0;
    transform: translateY(30px) !important;
  }
}
</style>
