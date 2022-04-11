<template>
    <div>
      
    <div class="content">
      <img src="@/assets/img/login/login_out.png" @load="okLoad" alt="" />
      <div class="text">You have logged out successfully ! </div>
      <el-button @click='jump' plain size="big">The page will jump in {{countdown}} seconds !</el-button>
    </div>
    </div>
</template>

<script>


export default {
  name: "loginout",
  data(){
    return{
      time:3
    }
  },
  created() {
  },
  mounted(){
    
  },methods:{
    okLoad(){
      
      setTimeout(()=>{
        this.jump()
      },3000)
    },jump(){
      this.$router.push('/home')
    },
  },computed:{
    countdown(){
      let timer = setInterval(() => {
        // 一定要减少上次出现的
        clearInterval(timer)
        this.time = this.time -1;
      }, 1000);
      return parseInt(this.time)
    }
  }
};
</script>

<style scoped>

img {
  width: 100px;
  transform: rotate(-7deg);
}
.text {
  color: #333333;
  margin-bottom: 30px;
}
.content{
  width: 300px;
  margin: 200px auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
