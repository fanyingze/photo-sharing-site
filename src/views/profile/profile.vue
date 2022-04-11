<template>
  <div class="profile">
    <div class="left">
      <!-- 第一部分展示用户基本信息 -->
      <div class="user-info" >
        
        
        <div class="avatar">
          <el-avatar :src="getAvatar" :size="50"></el-avatar>
        </div>
        <div><span class="userinfo-category , userinfo-category-name" >Name&nbsp;:</span> {{user.username}}</div>
        <div><span class="userinfo-category">E-mail:</span> {{user.email}}</div>
        <div class="userinfo-category-info" v-html="user.info"></div>
      </div>

      <!-- 第二部分修改用户的信息 -->
     <div class="user-menu">
       <ul>
         <li @click="toProfile" ><a href="javascript:">My Articles</a></li>
         
         <li @click="toInformation"><a href="javascript:">Information</a></li>
         <li @click="toArticle"><a href="javascript:">Publish</a></li>
       </ul>
     </div>
      
      
    </div>
    <div class="right">
      
      <!-- <profileInfo v-if="curIndex == 1" :userarticles="userarticles"></profileInfo> -->
      <profileChange v-if="curIndex == 2" :userinfo="user"></profileChange>
      <profileArticle v-if="curIndex == 3"></profileArticle>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import profileInfo from './profilechild/profileInfo.vue'
import profileChange from './profilechild/profileChange.vue'
import profileArticle from './profilechild/profileArticle.vue'

import {getUserInfo} from '@/network/profile.js'
import { getSpecificUserArticles } from '@/network/article.js'

export default{
  name:'profile',
  data(){
    return{
      curIndex:3,
      userinfo:{},
      userarticles:[]
    }
  },components:{
    profileInfo,
    profileChange,
    profileArticle
  },created(){
    this._getUserInfo()
    // 获取该作者文章的信息
    
    
  }
  ,computed:{
    ...mapGetters([
      	'user',
        'isAuthenticated'
      ]),
      getAvatar() {
      return this.user.avatar || require("../../assets/img/avatar/default.jpg");
    },
  },methods:{
    toProfile(){
      const id = this.user.id
      this.$router.push({path:'/userhome',query:{id:id}})
      console.log('跳转了');
    
    },toInformation(){
      this.curIndex = 2;
    },toArticle(){
      this.curIndex = 3;
    },

    //网络请求模块
    _getUserInfo(){
      getUserInfo().then(res=>{
        this.userinfo = res
        this._getSpecificUserArticles(res.data.data.id)
      })
    },
    _getSpecificUserArticles(id){
      getSpecificUserArticles(id).then(res=>{
       this.userarticles = res.data
      })
    },
}
}
</script>


<style scoped>
.profile{
  width: 1200px;
  /* background: red; */
  margin:50px auto ;
   color: #666666;
   display: flex;
}
.left{
  margin-left: 50px;
  padding-top: 20px;
  width: 25%;
  height: 300px;
  /* background: blue; */
  border-right: 1px solid rgba(0,0,0,.05);
}
.right{
  width: 55%;
  padding: 20px;
  margin-left: 30px;
}
.avatar{
  width: 105px;
  margin-bottom: 20px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.userinfo-category{
  color: #96CBCD;
}
.userinfo-category-name{
  font-size: 16.5px;
}
a{
  
  text-decoration: none;
  color: #666666;
}
li{
  margin-bottom:15px;
}
.user-menu{
  margin-top: 20px;
}
.userinfo-category-info{
  margin-top: 20px;
  color: #666666;
  
}
@media screen and  (max-width:600px){
 .profile{
   width: 100vw;
   display: block;
 }
 .left{
   width: 80%;
 }
 .right{
   
   width: 80%;
 }
}
</style>