<template>
  <div>

    <div class="num">
      Articles Num : {{userarticles.length}}
    </div>
    
    
  </div>
</template>

<script>



export default{
  name:'profileInfo',
  props:{
    userarticles:{
      type:Object
    }
  },data(){
    return{

    }
  }
}
</script>

<style scoped>
.profileinfo{
  width: 600px;
}
.num{
  font-weight: 500;
}
</style>