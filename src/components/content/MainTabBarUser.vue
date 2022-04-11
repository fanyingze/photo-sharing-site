<template>
  <div class="user">
    <div class="avatar">
      <a href="/profile"><el-avatar :src="getAvatar"></el-avatar></a>
    </div>

    <div class="user-text">
      <div class="main">
        <a href="/profile">{{ getUsername }}</a>
      </div>

      <div class="second1">
        <div class="second">
          <div>
            <a href="/profile">Publish</a>
          </div>
          <div @click="logout">
            <a href="/loginout">Log Out</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainTabBarItem from "./MainTabBarItem.vue";

export default {
  name: "MainTabBarUser",
  props: {
    user: {
      type: Object,
    },
  },
  components: {
    MainTabBarItem,
  },
  data() {
    return {
      item1: [
        
      ],
      username_sub:''
    };
  },
  created(){
    
  },

  computed: {
    getAvatar() {
      return this.user.avatar || require("../../assets/img/avatar/default.jpg");
    },
    getUsername(){
      let a = 'H'+this.user.username
        return a.substring(1,6)+'……'
    }
  },methods:{
    logout(){
      console.log('清楚了');
      localStorage.removeItem('eleToken')
    }
  }
};
</script>

<style scoped>
.user {
  height: 60px;
  display: flex;
  /* line-height: 60px; */
}
.user-text {
  width: 120px;
  margin-top: 8px;
}
.avatar {
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 15px;
}

.main a,
.second a {
  padding: 10px 10px;
  display: block;
  text-decoration: none;
  color: #96c6cb;
  font-size: 14px;
  font-family: "PingFang SC";
}
.second a {
  background: white;
  width: 200px;
}
a:hover {
  color: #aaaaaa;
}
.second1 {
  position: absolute;
}
.second {
  display: none;
}
.user-text:hover .second {
  display: block;
}
</style>
