<template>
  <div class="item">
    <img :src="getAvatar" alt="">
    <div ref="username">{{item.username}}</div>
    
  </div>
</template>

<script>
export default({
  name:'AvatarItem',
  props:{
    item:{
      type:Object
    }
  },data(){
    return{
      
    }
  },mounted(){
    
  }
  ,
  computed:{
    getAvatar(){
      return this.item.avatar ? this.item.avatar : require('@/assets/img/avatar/default.jpg')
    }
  },methods:{
    
  }
})
</script>

<style scoped>
img{
  width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 3px solid rgba(150,198,203,.3);
}
.item{
  overflow: hidden;
  font-size: 14px;
  color: #262626;
}
</style>
