<template>
  <div>
    <ArticleItem v-for="(item,index) in articlelist" :key=index :item='item'></ArticleItem>
  </div>
</template>

<script>
import ArticleItem from './ArticleItem.vue'
export default {
  name:'ArticleList',
  props:{
    articlelist:{
      type:Array
    }
  },
  components:{
    ArticleItem
  }
}
</script>

<style scoped>

</style>
