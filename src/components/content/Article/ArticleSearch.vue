<template>
  <div >
     <el-col :span="12">
    <el-autocomplete
      class="inline-input"
      v-model="state"
      :fetch-suggestions="querySearch"
      placeholder="Search"
      :trigger-on-focus="false"
      @select="handleSelect"
      @change="lost"
    ></el-autocomplete>
  </el-col>
  
  </div>
</template>

<script>
import {getSearchResult} from '@/network/article'

export default({
  name:'ArticleSearch',data() {
      return {
        restaurants: [],
        state: ''
      };
    },
    methods: {
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      
      handleSelect(item) {
        this.$emit('itemSearch',item.value)
      },
      lost(){
        this.$emit('itemSearch',this.state)
      }
    },
    mounted() {
      getSearchResult().then(res=>{
      this.restaurants = res.data
      })
    }
})
</script>

<style scoped>
.inline-input{
  width: 300px;
  
}
@media screen and  (max-width:600px){
  .inline-input{
  width: 40vw;
}

}
</style>
