<template>
  
  <div class="wrap">
   
    <div v-if="isShowDetail" class="blackground">
      <a href="javascript:" class="close" @click="closeDetail"><i class="el-icon-close , class-icon"></i></a>
      <div class="detail-wrap" ref="detailwrap" >
        <ArticleItem class="detail" :item="articleDetail" :right="!isMobile" @getImgHeight="getImgHeight"></ArticleItem>
        <articleRightBar v-if="!isMobile" :item="articleDetail" :userinfo="userinfo" class="rightBar" id="rightBar"></articleRightBar>
      </div>
    </div>
    <div class="userinfo">
      <div class="avatar-wrap">
        <div class="avatar">
        <img :src="userinfo.avatar" alt="">
      </div>
      </div>
      <div class="userinfo-tetx">
        <div class="userinfo-username">{{userinfo.username}}</div>
        <div class="userinfo-assets">

          <div class="article_num">{{userarticles.length}}     Articles</div>
          <div class="article_num">{{id}}     id</div>

        </div>
        <div class="userinfo-info" v-html="userinfo.info"></div>
      </div>

      
    </div>
    


    <div class="userarticles">
      
      <div  v-for="(item,index) in userarticles" :key="index" >
      <aticleItem class="article-item" :item="item" :index="index" @open="open"></aticleItem>
      </div>
    </div>
    
  </div>
</template>

<script>
import { getAuthorAvatar,getSpecificUserArticles } from '@/network/article.js'

import aticleItem from './userchild/aticleItem.vue'
import ArticleItem from '@/components/content/Article/ArticleItem.vue'
import articleRightBar from './userchild/articleRightBar.vue'

import { mapGetters } from 'vuex'

export default{
  name:'userhome',
  data(){
    return {
      id:null,
      userinfo:{},
      userarticles:[],
      articleDetail:{},
      isShowDetail:false
    }
  },props:{
    profileId:{
      type:Number
    }
  },
  components:{
    aticleItem,
    ArticleItem,
    articleRightBar
  },
  created(){
    console.log('创造了');
    
      this.id = this.$route.query.id
      console.log(this.id);
    // 获取作者的个人信息
    this._getAuthorAvatar(this.id);
    // 获取该作者文章的信息
    this._getSpecificUserArticles(this.id)

   


  },methods:{
    _getAuthorAvatar(id){
      getAuthorAvatar(id).then(res=>{
        this.userinfo = res.data[0]
      })
    },
    _getSpecificUserArticles(id){
      getSpecificUserArticles(id).then(res=>{
       this.userarticles = res.data

      })
    },
    open(index){
      this.articleDetail = this.userarticles[index]
      this.isShowDetail = true
    },closeDetail(){
      this.isShowDetail = false
    },getImgHeight(height){
      this.$refs.detailwrap.style.height = height + 'px'
    }
  },computed:{
    ...mapGetters([
      	'user',
        'isAuthenticated'
      ]),isMobile(){
        let w = window.innerWidth;
        if(w<600){
          return true
        }else if(w>=600){
          return false
        }
      }
  }
  
}
</script>

<style scoped>
.wrap{
  width: 1000px;
  margin: 30px auto;
}
.userinfo{
  display: flex;
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(0,0,0,.1);
}
.avatar img{
  width: 149px;
  height: 149px;
  border-radius: 50%;
  margin: 5px;
  border: 1px solid rgba(0,0,0,.05);
}
.avatar{
  width: 160px;
  height: 160px;
  border-radius:50%;
  border: 2px solid rgba(0,0,0,.1);
}
.avatar-wrap{
  width: 30%;
  display: flex;
  justify-content: flex-end;
}
.userinfo-tetx{
  width: 60%;
  margin-left: 70px;
}
.userinfo-username{
  font-size: 28px;
  color: #262626;
}
.userinfo-assets{
  display: flex;

}
.article_num{
  margin-right:30px ;
  margin-top: 20px;
  font-weight: 800;
}
.userinfo-info{
  margin-top: 20px;
  line-height: 30px;
}
.article-item{
  width: 280px;
  height:280px;
  margin-bottom: 20px;
}
.userarticles{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 10px;
}
.blackground{
  margin-left: -50px;
  width: 1100px;
  height: 750px;
  background: rgba(0,0,0,.5);
  position: fixed;
  top: 25px;
  z-index: 30;
  display: flex;
  align-items: center;
}
.close{
  display: block;
}
.class-icon{
  font-size: 50px;
  color: white;
  position: absolute;
  font-weight: 900;
  top: 20px;
  right: 20px;
}
.detail{
  /* margin: 0 auto; */
  width: 500px;
  background: white;
}
.detail-wrap{
  margin: auto;
  /* height: 180px; */
  width: 750px;
  display: flex;
 background: white;
}
@media screen and  (max-width:600px){
 .wrap{
   width: 100vw;
 }
 .avatar img{
  width: 25vw;
  height: 25vw;
  border-radius: 50%;
  margin: 5px;
  /* border: 1px solid rgba(0,0,0,.05); */
}
.avatar{
  width: 26vw;
  height: 26vw;
  border-radius:50%;
  border: 0px solid rgba(0,0,0,.1);
}
.avatar-wrap{
  width: 30%;
  display: flex;
  justify-content: flex-end;
  margin-left: 10px;
}
.userarticles{
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.article-item{
  width: 28vw;
  height:28vw;
  margin-bottom: 20px;
}
.blackground{
  width: 100%;
  height: 100%;
  top: 0px;
  margin-left:0;
}
.detail-wrap{
  width: 87%;
}
.class-icon{
  font-size: 25px;
  color: white;
  position: absolute;
  font-weight: 500;
  top: 0px;
  right: 3px;
}
}
</style>
