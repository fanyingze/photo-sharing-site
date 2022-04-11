<template>
  <div class="card">
    <!-- 展示用户基本信息 -->
    <div class="userinfo">
      <img :src="getAvatar" alt="" class="avatar">
      <div class="username">{{userinfo.username}}</div>
    </div>
    <!-- 展示文字区域 -->
    <div class="text">
      <div class="text-title">
        {{item.title}}
      </div>
      <span class="text-content" v-html="item.content" >
      </span>
      <div class="text-comment" v-for="(com,index) in getComment" :key="index">
        {{com.user_name}} : {{com.comment}}
      </div>
      <div class="cur-comment">
        
        <div class="user_comment , comment-text" v-for="(com,index) in user_cur_comment" :key="index">
          {{com.user_name}}:{{com.comment}}
        </div>
        
      </div>
    </div>
    <!-- 提交评论区 -->
    <div class="comment" v-if="isAuthenticated">

      <div class="login" v-if="isAuthenticated">
        <el-input v-model="comment_content" placeholder="请输入内容" class="input"></el-input>
        
          <a href="javascript:" @click="submitComment"><i class="el-icon-chat-dot-round , commenticon"></i></a>
        
      </div>



    </div>
  </div>
</template>

<script>
import { submitComment } from '@/network/article.js'
import { mapGetters } from "vuex";

export default{
  name:'articleRightBar',
  data(){
    return{
      comment_content:'',
      user_cur_comment:[],
    }
  },
  props:{
    item:{
      type:Object
    },
    userinfo:{
      type:Object
    }
  },
  computed:{
    getAvatar(){
      return this.userinfo.avatar ? this.userinfo.avatar : require('@/assets/img/avatar/default.jpg')
    },getComment(){
      return JSON.parse(this.item.comment)
    },
    ...mapGetters(["isAuthenticated","user"]),
  },methods:{
    submitComment(){
      let comment = {
        comment:this.comment_content,
        user_id:this.item.author_id,
        user_name:this.userinfo.username,
        article_id:this.item.article_id
      }
      submitComment(comment).then(res=>{
        this.user_cur_comment.push(comment)
      })
    },
  }
}
</script>

<style scoped>
.card{
  width: 250px;
  position: relative;
  color: #262626;
}
.avatar{
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: 20px;
}
.userinfo{
  height: 10%;
  margin-top: 10px;
  display: flex;
  align-items: center;
  margin-left:10px ;
  margin-right: 10px;
  border-bottom: 1px solid rgba(0,0,0,.1);
  padding-bottom: 10px;
}
.username{
  font-size: 18px;
}
.text{
  padding-left: 10px;
  margin-top: 10px;
  height: 70%;
  overflow: scroll;
}
.text-title{
  font-weight: 700;
  margin-bottom: 10px;
}
.text-content{
  width: 230px;
  word-break: break-all;
  padding-bottom: 10px;
  display: block;
}
.text-comment{
  margin-top: 10px;
  font-size: 14px;
}
.comment{
  
  padding-left: 10px;
  position: absolute;
  bottom: 0;
  width: 100%;
  line-height: 60px;
}
.comment a{
  color: #96c6cb;
  font-size: 30px;
  margin-left: 3px;
  position: relative;
  
}
.input{
  width: 80%;
}
.commenticon{
  font-weight: 700;
  position: absolute;
  bottom: 1px;
}
.cur-comment{
  margin-top: 10px;
  font-size: 14px;
}
</style>
