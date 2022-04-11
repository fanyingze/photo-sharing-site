<template>
  <div>
    <div class="wrap">
      <!-- logo部分 -->
      <div class="logo">
        <a href="/home"
          ><img class="logo-img" src="@/assets/logo.png" alt=""
        /></a>
      </div>
      <div class="menu">
        <MainTabBarItem :item="item1"></MainTabBarItem>
        <MainTabBarItem :item="item2"></MainTabBarItem>
        <MainTabBarItem :item="item3"></MainTabBarItem>
        <MainTabBarItem :item="item4"></MainTabBarItem>
        
      </div>
      <div class="contact">
        <MainTabBarItem
          v-if="!isAuthenticated"
          :item="register"
        ></MainTabBarItem>
        <MainTabBarItem
          v-if="!isAuthenticated"
          :item="login"
        ></MainTabBarItem>
        <MainTabBarUser v-if="isAuthenticated" :user="user"></MainTabBarUser>
      </div>
    </div>
  </div>
</template>

<script>
import MainTabBarItem from "./MainTabBarItem.vue";
import MainTabBarUser from "./MainTabBarUser.vue";
import { mapGetters } from "vuex";
import { relogin } from "@/plugins/relogin.js";

export default {
  name: "MainTabBar",
  components: {
    MainTabBarItem,
    MainTabBarUser,
  },
  data() {
    return {
      item1: [
        { main: "Home", mainlink: "/home" }
      ],
      item2: [
        { main: "Preset", mainlink: "/article" }
      ],
      item3: [
        { main: "Profile", mainlink: "/profile" },
      ],
      item4: [{ main: "About", mainlink: "/contact" },[
          { title: "Project", link: "/project" }
        ]],
      register:[{main:"Register",mainlink:'/register'}],
      login:[{main:"Login",mainlink:'/login'}]
    };
  },
  mounted() {
    // let user = relogin();
    // console.log(user);
    // this.user = user;
    // console.log("wo");
    // console.log(this.user);
  },
  computed: {
    ...mapGetters(["isAuthenticated","user"]),
  },
};
</script>

<style scoped>
.wrap {
  height: 60px;
  width: 100%;
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  /* background: red; */
}
.logo {
  margin-top: -3px;
  margin-right: 20px;
  width: 120px;
  height: 60px;
}
.logo-img {
  width: 150px;
  height: 60px;
}
.menu {
  width: calc(100vw - 300px);
  flex-wrap: wrap;
  display: flex;
}
.menu > * {
  margin-right: 20px;
}
.contact {
  height: 60px;
  width: 160px;
  margin-left: 20px;
  display: flex;
}
</style>