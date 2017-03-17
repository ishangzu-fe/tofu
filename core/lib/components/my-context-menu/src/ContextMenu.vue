<template lang="html">
  <div class="context-menu" @click.stop="close()" @contextmenu.prevent="test()">
    <div class="main" ref="main">
      <div class="item" v-for="item in items" @click.stop="item.handler">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      types: Array,
      required: true
    },
    x: {
      types: Number,
      default: 0
    },
    y: {
      types: Number,
      default: 0
    }
  },
  methods: {
    close () {
      this.$emit('closeContextMenu')
    },
    test() {
    }
  },
  mounted () {
    this.$refs.main.style.left = this.x + 'px'
    this.$refs.main.style.top = this.y + 'px'
  }
}
</script>

<style lang="scss">
.context-menu {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;

  .main {
    position: absolute;
    border: 1px solid #bbb;
    padding: 5px 0;
    background-color: #fff;
  }
  .item {
    width: 100%;
    height: 20px;
    line-height: 20px;
    padding: 0 15px;
    box-sizing: border-box;
    cursor: pointer;

    color: #000;
    font-size: 12px;

    &:hover {
      background-color: #eaeaea;
    }
  }
}
</style>
