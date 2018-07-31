<template>
    <div class="app">
        <div class="menu">
            <ul>
                <li v-for="(item, itemIndex) in routeList" :key="itemIndex">
                    <router-link :to="{ path: item.path }">{{ item.name }}</router-link>
                    <ul>
                        <li v-for="(child, childIndex) in item.children" :key="childIndex">
                            <router-link :to="{ path: child.path }">{{ child.name }}</router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="container" :class="wrapCls">
          <router-view></router-view>
        </div>
    </div>
</template>
<script>
import routes from "./router/routes";

export default {
  name: "app",
  computed: {
    routeList() {
      return routes;
    },
    wrapCls() {
      return this.$route.path.indexOf("template") > -1 ? "" : "page-component";
    }
  },
  mounted() {
    // 设置左侧导航栏
    document.querySelector(".menu > ul").style.height = document.querySelector(".menu").clientHeight + "px";
    document.querySelector(".menu").style.overflow = "scroll";
    document.querySelector(".menu").style.height = document.body.clientHeight + "px";
  }
};
</script>
<style lang="scss" scoped>
.app {
  width: 100%;
  height: 100%;

  .menu {
    width: 200px;
    padding-top: 40px;
    position: fixed;
    top: 0;

    li {
      text-align: left;
      padding-left: 20px;
      line-height: 30px;
      a {
        color: #666;

        &.router-link-active {
          color: #20a0ff;
        }
      }
    }
  }
  .container {
    height: 100%;
    margin-left: 210px;
    padding-right: 20px;
  }
}
</style>