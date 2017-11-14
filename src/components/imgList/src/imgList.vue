<template>
    <ul class="img-list">
        <li v-for="(item,index) in files" :key="item.url">
            <img :src="item.url + '@115w_115h_1c_1e'">
            <span class="img-actions">
                <span class="img-item prev" :class="{'hidden':index==0}" @click="handlePrev(index)" v-if="order">
                    <i class="el-icon-arrow-left" style="transform: scale(0.8);"></i>
                </span>
                <span class="img-item preivew" @click="handlePreview(index)">
                    <i class="el-icon-view" style="transform: scale(0.8);"></i>
                </span>
                <span class="img-item delete" @click="handleDelete(index)">
                    <i class="el-icon-delete2"></i>
                </span>
                <span class="img-item next" :class="{'hidden':index== (imgLength-1)}" @click="handleNext(index)" v-if="order">
                    <i class="el-icon-arrow-right" style="transform: scale(0.8);"></i>
                </span>
            </span>
        </li>
    </ul>
</template>

<script>
export default {
  name: "imgList",
  data() {
    return {
      files: this.value
    };
  },
  props: {
    value: {
      type: Array,
      default: []
    },
    order: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    deleteTip: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handlePreview(index) {
      this.$preview(this.imgList, index);
    },
    handleDelete(index) {
      if (!this.disabled) {
        if (this.deleteTip) {
          this.$confirm("确定要删除图片吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.value.splice(index, 1);
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除"
              });
            });
        } else {
          this.value.splice(index, 1);
        }
      }
    },
    handlePrev(index) {
      this.orderFiles(index, "prev");
    },
    handleNext(index) {
      this.orderFiles(index, "next");
    },
    orderFiles(from, type) {
      let to = type == "prev" ? from - 1 : from + 1;
      let toVal = this.value[from];
      this.$set(this.value, from, this.value[to]);
      this.$set(this.value, to, toVal);
    }
  },
  computed: {
    imgList() {
      var ary = [];

      this.value.forEach(item => {
        ary.push({
          src: item.url,
          infos: [
            (item.create_name || "") + "-" + (item.create_dept || ""),
            "上传时间:" + (item.create_time || "")
          ]
        });
      });

      return ary;
    },
    imgLength() {
      return this.value.length;
    }
  }
};
</script>

<style scoped lang="scss">
.img-list {
  li {
    width: 115px;
    height: 115px;
    float: left;
    position: relative;
    margin-right: 10px;
    border-radius: 2px;
    overflow: hidden;
  }
  img {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  .img-actions {
    position: absolute;
    width: 100%;
    height: 100%;
    line-height: 115px;
    left: 0;
    top: 0;
    cursor: default;
    text-align: center;
    color: #fff;
    font-size: 20px;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.3s;
    &:hover {
      opacity: 1;
    }
  }
  .img-item {
    display: inline-block;
    cursor: pointer;
    &.hidden {
      visibility: hidden;
    }
  }
}
</style>

