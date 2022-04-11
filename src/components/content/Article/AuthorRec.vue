<template>
  <div class="ar"><el-card class="box-card" shadow="hover">
    <div class="line"><div v-for="(item,index) in recAvatar" :key="index" class="avatar-wrap">
    <AvatarItem class="item" :item="item"></AvatarItem></div>
    
  </div>
  
</el-card></div>
</template>

<script>

import AvatarItem from './AvataraItem.vue'

export default {
  name:'AuthorRec',
  components:{
    AvatarItem
  },
  props:{
    recAvatar:{
      type:Array
    }
  },computed:{
    
  },filters:{
    overFlow:function(value){

      let totalLength = 0;
      let charCode = 0;
      for(let i =0;i<value.length;i++){
        charCode = value.charCodeAt(i)
        if(charCode < 0x007f){
          totalLength++;
        }else if((0x0080 <= charCode) && (charCode<=0x07ff)){
          totalLength += 2
        }else if((0x0800 <= charCode) && (charCode <= 0xffff)){
          totalLength += 3
        }else{
          totalLength += 4
        }
      }
      return totalLength
      // if(value.length>9){
      //   return value.substring(0,9)+"…"
      // }else{
      //   return value
      // }
    },
    getAvatar:function(url){
      return url? url : require('@/assets/img/avatar/default.jpg')
    }
  },created(){
    
  },methods:{
   
  }
}
</script>

<style scoped>

  .box-card{
    
    overflow: hidden;
    display: flex;
   
  }
  .line{
    display: flex;
    
  }
  .avatar-wrap{
    margin-top: -8px;
    width: 62px;
    text-align: center;
    margin-right: 20px;
    display: flex;
  }
  .avatar-username{
    font-size: 14px;
  }
  .item{
    height: 78px;
    
  }
  .ar{
    margin-top: 50px;
  }
</style>
