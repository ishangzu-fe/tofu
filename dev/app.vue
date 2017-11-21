<template>
    <div class="app">
        <div class="menu">
            <ul>
                <li v-for="(item,index) in routeList" :key="index">
                    <router-link :to="item.path">{{item.name}}</router-link>
                </li>
            </ul>
        </div>
        
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import routes from './router/routes';

export default {
  name: "app",
  computed:{
      routeList(){
          var array = [],name;
          routes.forEach(item => {
              if(item.path != "/"){
                  name = item.path.replace('/','');
                  name = name.substring(0,1).toUpperCase() + name.substring(1);
                  array.push({path:item.path,name:name})
              }
          });

          return array;
      }
  }
};
</script>
<style lang="scss" scoped>
.app {
  width: 100%;
  height: 100%;

  .menu{
      width: 200px;
      padding-top: 40px;
      position: fixed;
        
      li{
          text-align: left;
          padding-left: 20px;
          line-height: 30px;
          a{
            color: #666;
            
            &.router-link-active{
                color: #20a0ff;
            }
          }
      }
  }
  .container{
      height: 100%;
      margin-left: 210px;
      padding-right:20px;
  }
}
</style>