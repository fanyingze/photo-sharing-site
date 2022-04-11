<template>
  <div class="wrap">
    <el-upload
      class="avatar-uploader"
      :action="getHost"
      name="avatar"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <div v-if="imageUrl" class="avatar">Upload!</div>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

    
  </div>
</template>

<script>
import {host} from '@/network/request.js'
import {changeInfo} from '@/network/profile.js'

export default {
  name: "uploadAvatar",
  props:{
    userinfo:{
      type:Object
    }
  },
  data() {
      return {
        imageUrl:'',
      };
    },
    computed:{
      getHost(){
        return host()+'/api/upload/avatar'
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        
        this.imageUrl = URL.createObjectURL(file.raw);
        // 获取头像地址成功，将头像地址更换
        const payload = {avatar:res}
        changeInfo(payload).then(res=>{
          location.reload();
        })
        
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error(' Upload avatar only JPG/PNG!');
        }
        if (!isLt2M) {
          this.$message.error('The size of uploaded profile picture cannot exceed 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
};
</script>

<style scoped>
.wrap {
  width: 80px;
  height: 80px;
}
.avatar-uploader,
.el-upload {
  height: 80px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}
.avatar {
  width: 80px;
  height: 80px;
  display: block;
  color: #96c6CB;
}
</style>