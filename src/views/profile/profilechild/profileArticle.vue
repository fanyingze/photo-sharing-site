<template>
  <div class="wrap">
    <!-- <div   class="btn"><el-button @clcik.native ="jumpToPublish" icon="el-icon-edit" size="small">Publish</el-button></div> -->
     <a class="wrap-title"><i class="el-icon-edit"></i>Publish</a>
     
    <publish></publish>
  </div>
</template>

<script>
import publish from '../../article/publish.vue'

export default{
  name:'profileArticle'
  ,components:{
    publish
  },
  methods:{
    jumpToPublish(){
      console.log('hhh');
      this.$router.push('/profile/publish')
    }
  }
}
</script>

<style scoped>
.wrap{
  position: relative;
}
.wrap>a{
  font-size: 20px;
  text-decoration: none;
  color: #96CBCD;
}
.wrap-title{
  margin-bottom: 20px;
  display: block;
}

</style>