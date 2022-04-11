<template>
  <div class="wrap">
    <el-col :span="7">
    <el-card shadow="hover">
      <div class="mid">
        <i class="el-icon-picture-outline-round , icon" ></i>
      <div>真实胶片色</div>
      </div>
      
      <div class="dec">所有预设均采样自胶片，这样的预设可以极大还原胶片真正的色彩
       
        
      </div>
    </el-card>
  </el-col>
  <el-col :span="7">
    <el-card shadow="hover">
       
       <div class="mid"><i class="el-icon-camera , icon" ></i><div>多场景拍摄</div></div>
      
      <div class="dec">预设含有不同色温的日光、钨丝灯下胶卷的表现，您可以在不同色温下模拟出胶片颜色</div>
    </el-card>
  </el-col>
  <el-col :span="7">
    <el-card shadow="hover">
      <div class="mid"><i class="el-icon-video-camera , icon" ></i>
      <div>Lut格式</div></div>
      <div class="dec">您不仅可以在Lr、Ps中使用，可以在一众的视频软件中进行模拟</div>
    </el-card>
  </el-col>
  </div>
</template>

<script>
export default {
  name:'HomeBottomBar'
}
</script>

<style scoped>
.wrap{ 
  color: #666666;
  width: 90%;
  /* height: 80px; */
  margin: 60px auto;
  /* border-top: 1px solid rgba(0,0,0,0.03); */
  /* background: #ececec; */
  display: flex;
  justify-content: space-between;
  margin-bottom: 100px;
}
.icon{
  font-size: 100px;
}
.mid{
  text-align: center;
  margin-bottom: 20px;
}
.dec{
  font-size: 14px;
}
</style>