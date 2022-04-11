<template>

  <div class="itemcard" >
    <!-- 用户信息部分 -->
    <div class="part-one" v-if="!right">
      
      
      <div class="avatar"> 
        <el-avatar :src="getAvatar" >
          </el-avatar>
        </div>
        <a href="javascript:"  @click="jumpToAuthor"><span>{{userinfo.username}}</span></a>
      
    </div>
    <!-- 照片部分 -->
    
    <div class="part-two">
      <el-carousel trigger="click"  :autoplay="false" :height="getCoverHeight" >
      <el-carousel-item v-for="(img,index) in getImgPath" :key="index" class="img-wrap">
        <img :src="img.path" alt="" >
      </el-carousel-item>
      
    </el-carousel>
    </div>
  <div v-if="!right">

    <div class="tags-wrap" >
        <div class="tag" v-for="(tag,tindex) in getTags" :key="tindex">#{{tag}}</div>
      </div>
    <!-- 照片说明部分 -->
    <div class="part-three">
     
     
      <div class="content" ref="content">
      <div class="article-title"><div>{{item.title}}</div><div class="article-time">{{item.pub_date}}</div></div>
      <div class="article-content" v-html="getContent"  :class="{overflow:isOverFlow == true}"> </div>
      
    </div>
  <a href="javascript:" v-if="showMoreBtn" @click="showMoreChange">{{showMoreText}}</a>
  <div class="cur-comment">
        <div class="user_comment , comment-text" v-for="(rcom,rindex) in getComment" :key="rindex">
          {{rcom.user_name}}: {{rcom.comment}}
        </div>

        <div class="user_comment , comment-text" v-for="(com,index) in user_cur_comment" :key="index">
          {{com.user_name}}:{{com.comment}}
        </div>
        
      </div>
    </div>
    <!-- 点赞评论部分 -->
    <div class="part-four" >
      <div class="login" v-if="isAuthenticated">
        <el-input v-model="comment_content" placeholder="请输入内容"></el-input>
      <div class="btn">
        <div class="btn-first">
          <i class="el-icon-star-off"></i>
        </div>
        <div class="btn-second">
          <a href="javascript:" @click="submitComment">Comment</a>
        </div>
      </div>
      </div>
      
      <div class='nologin' v-if="!isAuthenticated">
        <a href="/login">登录后才能互动</a>
        <a href="/register">还没有账号？</a>
      </div>
      
      
    </div>

  </div>
    
  </div>
</template>


<style scoped>
.part-one{
  border: 1px solid rgba(0,0,0,.1);
  /* background: red; */
  margin-top: 20px;
}
.part-one{
  font-size: 14px;
  color: #262626;
  font-weight: 700;
  display: flex;
  height: 40px;
  line-height: 40px;
  padding:10px ;
  padding-left:20px ;
}
.avatar{
  margin-right: 10px;
}
.part-two{
  border-left: 1px solid rgba(0,0,0,.1);
  border-right: 1px solid rgba(0,0,0,.1);
}
.part-three{
  
  padding: 20px;
  border-left: 1px solid rgba(0,0,0,.1);
  border-right: 1px solid rgba(0,0,0,.1);
  border-bottom: 1px solid rgba(0,0,0,.1);
}
.article-title{
  color: #262626;
  margin-bottom: 15px;
}
.article-content{
  font-size: 14px;
}
.part-three>a{
  text-decoration: none;
  color: #96C6CB;
}
img{
  width: 100%;
  margin: auto;
}
.img-wrap{
  text-align: center;
  display: flex;
  
}
.overflow{
  height: 80px;
  overflow: hidden;
}
.part-four{
  font-size: 30px;
  padding-left: 20px;
  padding-right: 20px;
  border-left:1px solid rgba(0,0,0,.1);
  border-right:1px solid rgba(0,0,0,.1);
  border-bottom:1px solid rgba(0,0,0,.1);
  
}
.part-four>i{
  margin-right: 10px;
}
.btn{
  display: flex;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
  align-items: center;
}
.btn-second>a{
  font-size: 16px;
  text-decoration: none;
  color: #96C6CB;
}
.cur-comment{
  padding-top: 10px;
  font-size: 14px;

}
.article-title{
  display: flex;
  justify-content: space-between;
}
.article-time{
  font-size:14px ;
  font-weight: 200;
  color:#96C6CB;
}
.tags-wrap{
  color: #96C6CB;
  display: flex;
  padding-bottom: 5px;
  padding-left:20px ;
  padding-right:20px ;
  padding-top:8px ;
  border-right: 1px solid rgba(0,0,0,.1);
  border-left: 1px solid rgba(0,0,0,.1);
  flex-wrap: wrap;
}
.tag{
  padding: 0 5px;
  margin-right: 5px;
  border: 0.2px solid #96C6CB;
}
.comment-text{
  color: #535353;
}
.nologin a{
  display: block;
   color: #96C6CB;
   text-decoration: none;
}
.nologin{
  padding-top: 20px;
  text-align: center;
  font-size: 14px;
  margin-bottom: 13px;
}
.part-one a{
  text-decoration: none;
  color: #262626;
}
</style>



<script>
import { getAuthorAvatar,submitComment } from '@/network/article.js'
import { mapGetters } from "vuex";

export default {
  name:'ArticleItem',
  data(){
    return{
      userinfo:{},
      coverImg:'',
      imgInfo:{},
      isShowMore:false,
      domHeight:0,
      isOverFlow:false,
      comment_content:'',
      user_cur_comment:[],
      imgHeight:0,
      isRight:false
    }
  },
  props:{
    item:{
      type:Object
    },
    right:{
      type:Boolean,
      default:false
    }
    
  },
  computed:{
    getAvatar(){
      return  this.userinfo.avatar || require("../../../assets/img/avatar/default.jpg");
    },
    getImgPath(){
      return JSON.parse(this.item.imgArray)
    },
    getCoverHeight(){

      let width = (this.imgInfo.height/this.imgInfo.width)*600
      let w = window.innerWidth;
      if(w <600){
        return this.imgInfo.height
      }
      
      if(width>650){
        this.$emit('getImgHeight',650)
        return 650+'px'
      }else if(width<350){
        this.$emit('getImgHeight',500)
        return 500+'px'
      }else if(width <=650){
        this.imgHeight = width
        this.$emit('getImgHeight',width)
        return width+'px'
      }
     
    },
    getContent(){
      if(this.domHeight > 137 && this.isShowMore === false){
        this.isOverFlow = true
        return this.item.content
      }else if((this.domHeight > 137 && this.isShowMore === true)||this.domHeight <= 137){
        this.isOverFlow = false
        return this.item.content
      }
    },showMoreBtn(){
      if(this.domHeight >137){
        return true
      }else {
        return false
      }
    },showMoreText(){
      if(this.isShowMore === false){
        return 'ShowMore'
      }else {
        return 'PackUp'
      }
    },getComment(){
      return JSON.parse(this.item.comment)
    },getTags(){
      return JSON.parse(this.item.article_tag)
    },
    ...mapGetters(["isAuthenticated","user"]),
  
  }
  ,
  created(){
    this._getAuthorAvatar(this.item.author_id) 
    if(this.right == true){
      this.isRight == true
    }else{
      this.isRight == false
    }
  },activated(){
    this._getAuthorAvatar(this.item.author_id) 
    if(this.right == true){
      this.isRight == true
    }else{
      this.isRight == false
    }
  }
  ,mounted(){
    this.getContentHeight()
  },
  methods:{
    _getAuthorAvatar(id){
      getAuthorAvatar(id).then(res=>{
        this.userinfo = res.data[0]
        const cover_img_url = JSON.parse(this.item.cover_img).path
        this.getCoverImgInfo(cover_img_url)

      })
    },
    getCoverImgInfo(url){
      let img = new Image()
      img.src = url
      const vm = this
      img.onload = function(){
        
        vm.$set(vm.imgInfo,'height',img.height)
        vm.$set(vm.imgInfo,'width',img.width)
        
      }
    },showMoreChange(){
      this.isShowMore = this.isShowMore === true ? false : true
    },getContentHeight(){
      if(this.right==true){return}
      if(this.isRight == true){ return }
      let dom = this.$refs.content
      this.domHeight = dom.offsetHeight
    },submitComment(){
      let comment = {
        comment:this.comment_content,
        user_id:this.user.id,
        user_name:this.user.username,
        article_id:this.item.article_id
      }
      submitComment(comment).then(res=>{
        this.user_cur_comment.push(comment)
      })
    },jumpToAuthor(){
      const id = this.item.author_id
      this.$router.push({path:'/userhome',query:{id:id}})
      console.log('跳转了');
    }
  },watch:{
    item(){
      this._getAuthorAvatar(this.item.author_id) 
    }
  }
}
</script>

