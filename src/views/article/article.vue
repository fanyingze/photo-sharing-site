<template>
  <div>
    <div class="article">
      <div class="left">
        
        <AuthorRec :recAvatar="recAvatar" ></AuthorRec>
        <ArticleList :articlelist="articlelist" v-if="!nonFound" ></ArticleList>
        <div class="notfoun" v-if="nonFound"><div>It's Nothing</div><div>Please Change the Key Words!</div></div>
        <div class="loading" v-if="isNeedMorePage"><i class="el-icon-loading"></i></div>
        <div class="loading-bottom" v-if="isBottom">It's Bottom</div>
        
      </div>
      <div class="right">
        
        <ArticleRec class="sticky" v-on:itemSearch="itemSearchFF"></ArticleRec>
      </div>
      
    </div>
  </div>
</template>

<script>
import ArticleList from '@/components/content/Article/ArticleList.vue'
import AuthorRec from '@/components/content/Article/AuthorRec.vue'
import ArticleRec from '@/components/content/Article/ArticleRec.vue'

import {getArticleList,getRecAvatar,getSearchResultCB} from '@/network/article.js'
export default{
  name:'articleviews',
  data(){
    return{
      curPage:1,
      articlelist:[],
      isNeedMorePage:false,
      isBottom:false,
      recAvatar:[],
      nonFound:false,
      tempList:[],
      searchNum:0
      
    }
  },
  components:{
    ArticleList,
    AuthorRec,
    ArticleRec,
    
  },created(){
    // 监听滚动到底部事件
    window.addEventListener('scroll',this.Scrollbottom)
    this._getArticleList(1)
    this._getRecAvatar()

  },mounted(){
    this.$bus.$on('search',(id)=>{
      if(window.innerWidth>600){
        return 
      }
      // 和搜索FF相同功能
      if(this.searchNum ==0){
        this.tempList = this.articlelist
        this.searchNum ++;
      }
      if(id.length==0){
        this.articlelist = this.tempList
        return
      }
      getSearchResultCB(id).then(res=>{
        console.log(res);
        if(res.data.status && res.data.status== 404){
          
          this.nonFound = true
        }else{
          this.nonFound = false
           this.articlelist = res.data
        }
      })
      // 和搜索FF相同功能
    })
  },computed:{
    
  },methods:{
    // 监听当前页面是否滚动到底部
    Scrollbottom(){
      let scrollTop = document.documentElement.scrollTop ||  document.body;
      let clientHeight = document.documentElement.clientHeight;
      let scrollHeight = document.documentElement.scrollHeight;
      if(scrollTop + clientHeight >= scrollHeight){
        setTimeout(()=>{
          this.isNeedMorePage = true;
          this.curPage ++;
          this._getArticleList(this.curPage)
        },500)
      }
    },
    //网络请求模块
    // 获取文章主要列表
    _getArticleList(page){
      getArticleList(page).then(res=>{
        this.articlelist.push(...res.data)
        this.isNeedMorePage = false
        if(res.data.length == 0){
          this.isBottom = true
        }
    })
    },
    // 获取推荐用户的头像、用户名、及id
    _getRecAvatar(){
      getRecAvatar().then(res=>{
        console.log(res);
        this.recAvatar = res.data
      })
    },
    itemSearchFF(id){
      if(this.searchNum ==0){
        this.tempList = this.articlelist
        this.searchNum ++;
      }
      if(id.length==0){
        this.articlelist = this.tempList
        return
      }
      getSearchResultCB(id).then(res=>{
        console.log(res);
        if(res.data.status && res.data.status== 404){
          
          this.nonFound = true
        }else{
          this.nonFound = false
           this.articlelist = res.data
        }
      })
    },
    
  }
}
</script>

<style scoped>

.article{

  width: 1000px;
  margin: 2vw auto;
  display: flex;
  justify-content: space-between;
  position:relative;
}
.left{
  width: 600px;
}
.right{
  right: calc((100vw - 1000px)/2);
  position: fixed;
  width: 300px;
  top: 75px;
}

.maintabbar {
  width: 95%;
  margin: 0 auto;
}
.loading{
  width: 600px;
  padding-top:30px ;
  font-size: 30px;
  text-align: center;
}
.loading-bottom{
  width: 300px;
  text-align: center;
  margin: 30px auto;
  padding-top:10px ;
  border-top: 1px solid rgba(0,0,0,.03);
  color: #666666;
}
.backTop{
  position: fixed;
  border: 3px solid #96C6CB;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  text-align: center;
  font-size: 40px;
  line-height: 45px;
  color: #96C6CB;
  top: 0;
  right: 30vw;
  z-index: 10;
}
.notfoun{
  width: 650px;
  text-align: center;
  margin-top:20px;
  margin-left: -8px;
  font-size:20px;
  color: #666666;
}


@media screen and  (max-width:1000px){
  .right{
    display: none;
  }
  .article{
    width: 100%;
    
  }
  .left{
    width: 600px;
    margin: 0 auto;
  }

}


</style>