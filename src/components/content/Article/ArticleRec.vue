<template>
  <div>
    
    <div class="search">
      <ArticleSearch v-on:itemSearch="itemSearchFa" class="search-item"></ArticleSearch>
    </div>
    
    <div class="rec">
      <div class="rec-main-title">Recommend</div>
      <div v-for="(item,index) in recList" :key="index">
        <div class="rec-item">
          <img :src="item.cover_img | imgJSON" alt="">
          <div class="text">
            <div class="rec-title">{{item.title | getTitle}}</div>
            <a href="javascript:" class="view" @click="viewClick(item.title)">View</a>
          </div>
        </div>
      </div>
    </div>
    <div class="aboutMy">
      <div class="me">
        Contact:761545737@qq.com
      </div>
      <div class="me">
        © 2022FILMPRESET FROM FANYINGZE
      </div>
    </div>
  </div>
</template>

<script>
import {getRecArticle} from '@/network/article'

import ArticleSearch from './ArticleSearch.vue'
export default {
  name:'ArticleRec',
  components:{
    ArticleSearch
  },data(){
    return{
      recList:[]
    }
  },
  methods:{
    itemSearchFa(id){
      this.$emit('itemSearch',id)
    }
    ,viewClick(id){
      this.$emit('itemSearch',id)
    }
  },
  created(){
    getRecArticle().then(res=>{
      this.recList = res.data
    })
  },filters:{
    imgJSON(value){
      return JSON.parse(value).path
    },
    getTitle(value){
      if(value.length>10){
        return value.substring(0,10)+"…"
      }else {
        return value
      }
    }
  },computed:{
    
  }
}
</script>

<style scoped>
a{
  text-decoration: none;
  color: #262626;
}
.search-item{
  width: 100%;
  background: blue;
}
.search{
  height: 50px;
}
.rec{
  margin-top: 10px;
  padding: 10px;
}
.rec img{
  width: 40px;
  height: 40px;
  border-radius: 2px;
  margin-right: 15px;
}
.rec-item{
  display: flex;
  margin-top: 10px;
}
.text{
  width: 100%;
  display: flex;
  justify-content: space-between;
  line-height: 40px;
}
.view{
  color: #96C6CB;
}
.aboutMy{
  margin-top: 20px;
  
  font-size: 14px;
  color: #b9b9b9;
}
.rec-main-title{
  margin-bottom: 20px;
}
</style>
