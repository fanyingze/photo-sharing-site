<template>
  <div class="pig">
    <div class="first">
      <div class="title">
      Film Preset
      </div>
      <div class="title-second">
        一个提供采样胶片预设的专栏
      </div>
    </div>
    
    <div class="sceond">
      <notable :imgitem="imgitem"></notable>
    </div>

    <HomeBottomBar class="bar"></HomeBottomBar>
    <div>
    </div>
  </div>
</template>

<script>
import notable from '@/components/common/notable.vue'
import HomeBottomBar from '@/components/content/HomeBottomBar/HomeBottomBar'
import {getNotable} from '@/network/home.js'

export default{
  name:'home',
  components:{
    notable,
    HomeBottomBar
  },
  data(){
    return{
      imgitem:[]
    }
  },
  mounted(){
    this._getNotable()
  },
  methods:{
    // 网络模块
    _getNotable(){
      getNotable().then(res=>{
        this.imgitem = res.data;
        console.log(this.imgitem);
      })
    }
  }
}
</script>

<style scoped>
.pig{
  font-family: "PingFang SC";
}
.first{
   text-align: center;
   margin: 30px auto;
}
.title{
  margin-bottom: 10px;
  color: #555555;
  font-size: 34px;
}
.title-second{
  font-size: 18px;
  color: #888888;
}
.sceond{
  margin: 0 auto;
 width: 800px;
}

</style>