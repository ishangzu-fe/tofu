<template>
  <div class="demo-block thinScroll">
    <div class="demo-block-source">
      <slot></slot>
    </div>
    <div class="demo-block-code" v-show="bExpand">
      <slot name="highlight"></slot>
    </div>
    <div class="demo-block-btn" @click="handleExpand">
      {{bExpand ?  `收齐代码` : `展开代码`}}
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      code: "",
      bExpand: false
    };
  },
  methods: {
    handleExpand() {
      this.bExpand = !this.bExpand;
    }
  },
  mounted() {}
};
</script>