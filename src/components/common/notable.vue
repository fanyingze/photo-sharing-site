<template>
  <div >
    <el-carousel indicator-position="outside" height="600px" >
    <el-carousel-item v-for="(item,index) in imgitem" :key="index">
      <a :href="item.link"><img :src="item.src" alt=""></a>
    </el-carousel-item>
  </el-carousel>
  
  </div>
</template>

<script>

export default{
  name:'notable',
  props:{
    imgitem:{
      type:Array
    }
  },methpds:{
    
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  img{
    width: 800px;
  }
</style>