<template>
  <div id="app">
    <MainTabBar v-if="!isMobile" class="maintabbar" :class="{articleMainTabBar:isArticlePath === true}"></MainTabBar>
    <MoTabBar v-if="isMobile"  class="motabbar" :class="{articleMoTabBar:isArticlePath === true}"></MoTabBar>
    <router-view />
  </div>
</template>

<script>
import MainTabBar from "@/components/content/MainTabBar";
import jwt_decode from "jwt-decode";
import {relogin} from '@/plugins/relogin'
import {getUserInfo} from '@/network/profile.js'
import MoTabBar from '@/components/content/Moblie/MoTabBar'

export default {
  name: "app",
  components: {
    MainTabBar,
    MoTabBar
  },data(){
    return{
      isLogout:this.$route.path === '/loginout' ? true : false,
      excluedePath:'/home'
    }
  },computed:{
      isArticlePath(){
        let result = this.$route.path === this.excluedePath ? true : false
        return result
      },
      isMobile(){
        let w = window.innerWidth;
        if(w<600){
          return true
        }else if(w>=600){
          return false
        }
      }
  },
  created() {
    // 刷新后用户还可以活跃在页面中
    if (localStorage.eleToken) {
      const decoded = jwt_decode(localStorage.eleToken);
      this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded));
      
      getUserInfo().then(res=>{
    const userinfo = res.data.data
    this.$store.dispatch("setUser",userinfo)
    
  })
    }
  }
  ,methods:{
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>

<style>
.maintabbar {
  width: 95%;
  margin: 0 auto;
}
.articleMainTabBar{
  position: fixed;
  top: 0;
  left: 2.5vw;
  background: white;
  z-index: 11;
}
.articleMoTabBar{
  position: fixed;
  top: 0;
  /* left: 2.5vw; */
  background: white;
  z-index: 11;
}
/* @import 'assets/css/base.css'; */
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
}
ul{
  list-style-type: none;
}
</style>
