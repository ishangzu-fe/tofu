<template>
  <div class="code-demo-block thinScroll">
    <div class="code-demo-block-source">
      <slot></slot>
    </div>
    <div class="code-demo-block-code hljs" v-show="bExpand">
      <slot name="highlight"></slot>
    </div>
    <div class="code-demo-block-btn" @click="handleExpand">
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