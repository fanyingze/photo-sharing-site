<template>
  <div class="wrap">
    <div class="logo">
      <a href="/home"
          ><img class="logo-img" src="@/assets/logo.png" alt=""
        /></a>
    </div>
    
    <div class="search" v-if="isNeedSearch">
      <ArticleSearch @itemSearch="itemSearch" class="search-input" ></ArticleSearch>
    </div>
    
    <div class="menu">
      <el-dropdown>
  <span class="el-dropdown-link">
    <i class="el-icon-menu el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown" class="pull-menu">

    

    <el-dropdown-item><a href="/home">Home</a></el-dropdown-item>
    <el-dropdown-item><a href="/article">Preset</a></el-dropdown-item>
    
    <el-dropdown-item><a href="/contact">About</a></el-dropdown-item>
    <div v-if="!isAuthenticated">
      <el-dropdown-item divided><a href="/login">Login</a></el-dropdown-item>
    <el-dropdown-item ><a href="/register">Register</a></el-dropdown-item>
    </div>
    <div v-if="isAuthenticated">
      <el-dropdown-item divided><a href="/profile">{{user.username}}</a></el-dropdown-item>
      <el-dropdown-item ><a href="/loginout" @click="logout">Logout</a></el-dropdown-item>
      <!-- {{user}} -->
    </div>


    <div>

    </div>
    
  </el-dropdown-menu>
</el-dropdown>
    </div>
  </div>
</template>

<script>
import ArticleSearch from '../Article/ArticleSearch.vue'
import { mapGetters } from "vuex";
export default{
  name:'MoTabBar',
  components:{
    ArticleSearch
  }, computed: {
    ...mapGetters(["isAuthenticated","user"])
   ,isNeedSearch(){
    let result = this.$route.path === '/home' ? true : false
    return result
  }
  },methods:{
    logout(){
      localStorage.removeItem('eleToken')
    },
    itemSearch(item){
      this.$bus.$emit('search',item)
    }
  }
}
</script>

<style scoped>
.logo img{
  width: 120px;
  position: absolute;
  top: 3px;
}
.logo{
  width: 120px;
  height: 100%;
  position: relative;
}
.wrap{
  
  width: 100vw;
  height: 55px;
  display: flex;
  justify-content: space-between;
  line-height: 55px;
  background: white;
}
.search{
 
  margin-right: 20px;
}
.menu{
  width: 50px;
  margin-right: 10px;
}
.el-dropdown-link {
    cursor: pointer;
    color: #96C6CB;
  }
  .el-icon-menu {
    font-size: 30px;
    /* margin-top: 20px; */
    line-height: 55px;
    
  }
  .pull-menu a{
    text-decoration: none;
    color: #96C6CB;
  }
</style>