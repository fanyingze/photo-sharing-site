<template>
  <div>
    <div class="content">
      <el-collapse  @change="handleChange">

  <el-collapse-item title="Change Info" name="1">

    
      
      <br>
      <!-- 修改name模块 -->
      <el-form :model="newUserInfo" ref="newUserInfo" label-width="100px" >
        <el-form-item label="Name" prop="username" :rules="rules.username">
         <el-input  v-model.number="newUserInfo.username" autocomplete="off"></el-input>
         </el-form-item>
       <el-form-item>
         <el-button type="primary" @click="submitInfo('newUserInfo')">Submit</el-button>
         <el-button @click="resetForm('newUserInfo')">Reset</el-button>
         </el-form-item>
      </el-form>
      <!-- 修改email模块 -->
      <el-form :model="newUserInfoEmail" ref="newUserInfoEmail" label-width="100px" >
        <el-form-item label="Email" prop="email" :rules="rules.email">
         <el-input  v-model.number="newUserInfoEmail.email" autocomplete="off"></el-input>
         </el-form-item>
       <el-form-item>
         <el-button type="primary" @click="submitInfo('newUserInfoEmail')">Submit</el-button>
         <el-button @click="resetForm('newUserInfoEmail')">Reset</el-button>
         </el-form-item>
      </el-form>
      <br>
      <div v-show="false">
        {{keepContent}}{{tempUserInfo}}{{newUserInfoInfo}}
      </div>
      
      
      
      <!-- 修改简介模块 -->
      <el-form :model="newUserInfoInfo" ref="newUserInfoInfo" label-width="100px" >
        <el-form-item label="Introduction" prop="info" >

          <el-input type="textarea" placeholder="Introduction" v-model.number="tempUserInfo" maxlength="100" show-word-limit></el-input>

         </el-form-item>
       <el-form-item>
         <el-button type="primary" @click="submitInfo('newUserInfoInfo')">Submit</el-button>
         <el-button @click="resetForm('newUserInfoInfo')">Reset</el-button>
         </el-form-item>
      </el-form>
      
   
  </el-collapse-item>
  <!-- 上传头像 -->
  <el-collapse-item title="Change Avatar" name="2">
    <div class="avatar">
          <div class="avatar-text1">Current Avatar:</div>
          <el-avatar shape="square" :src="getAvatar" :size="80" ></el-avatar>
    </div>
    <div class="avatar">
           <div class="avatar-text2">Upload New Avatar:</div>
          <uploadAvatar :userinfo="userinfo"></uploadAvatar>
    </div>
      
  </el-collapse-item>
 <!-- 修改密码模块 -->
  <el-collapse-item title="Change Password" name="3">
    
      <br>
      <el-form :model="newUserInfoPassword" ref="newUserInfoPassword" label-width="100px" >
        <el-form-item label="OldPwd" prop="oldPassword" :rules="rules.password">
         <el-input type="password" v-model.number="newUserInfoPassword.oldPassword" autocomplete="off"></el-input>
         </el-form-item>
        <el-form-item label="NewPwd" prop="newPassword" :rules="rules.password">
         <el-input  show-password type="password" v-model.number="newUserInfoPassword.newPassword" autocomplete="off"></el-input>
         </el-form-item>
       <el-form-item>
         <el-button type="primary" @click="submitInfo('newUserInfoPassword')">Submit</el-button>
         <el-button @click="resetForm('newUserInfoPassword')">Reset</el-button>
         </el-form-item>
      </el-form>
  </el-collapse-item>
</el-collapse>
    </div>
  </div>
</template>

<script>
import { changePassword, changeInfo } from '@/network/profile.js'
import uploadAvatar from './uploadAvatar.vue'


export default{
  name:'profileChange',
  props:{
    userinfo:{
      type:Object
    }
  },
  computed:{
    getAvatar() {
      return this.userinfo.avatar || require("../../../assets/img/avatar/default.jpg");
    },
    keepContent(){
    let res = this.tempUserInfo.replace(/\r\n/g,'<br/>').replace(/\n/g,'<br/>').replace(/\s/g,' ')
    this.newUserInfoInfo.info  = res
    return res
  }
  },components:{
    uploadAvatar
  }
  ,
  data() {
    var isSameName=(rule,value,callback)=>{
      if(value == this.userinfo.username){
        callback(new Error('The new Name must be different from the old one'))
      }else{
        callback();
      }
    };
    var isSameEmail=(rule,value,callback)=>{
      if(value == this.userinfo.email){
        callback(new Error('The new E-mail must be different from the old one'))
      }else{
        callback();
      }
    };
      return {
         tempUserInfo:'',
         newUserInfoInfo:{info:this.keepContent},
         newUserInfo: {username: ''},
         newUserInfoEmail:{email:''},
         newUserInfoPassword:{oldPassword:'',newPassword:''},
        rules: {
          email: [
            {type:'email',required:true,message:'Please fill in the correct email address',trigger:'blur'},
                  {validator:isSameEmail,trigger:'blur'}
         ],
          username: [{required:true,message:'Please fill in the username',trigger:'blur'},
                  {min:2,max:30,message:'The length is between 2 and 30 characters',trigger:'blur'},
                  {validator:isSameName,trigger:'blur'}
                  ],
         password: [
            {required:true,message:'Please fill in the password',trigger:'blur'},{
              min:6,max:30,message:'The length is between 6 and 30 characters'
            }]}, 
      };
    },
    methods: {
      handleChange(val) {
        console.log(val);
      },
      submitInfo(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 判断是否是需要修改密码
            if(formName === 'newUserInfoPassword'){
               const data = this.newUserInfoPassword
               changePassword(data).then(res=>{
                 if(res.data.status == 0){
                   this.changeSucess()
                 }
               })
               return
              }
              // 判断是否需要修改用户名
            else if(formName === 'newUserInfo'){
               const data = this.newUserInfo
               changeInfo(data).then(res=>{
                 console.log(res);
                 if(res.data.status == 0){
                  location.reload();
                 }})            
             return
          }else if(formName === 'newUserInfoEmail') {
              const data = this.newUserInfoEmail
               changeInfo(data).then(res=>{
                 if(res.data.status == 0){
                   this.changeSucess()
                 }})            
             return
          }
          // 判断是否修改简介
          else if(formName === 'newUserInfoInfo') {

              const data = this.newUserInfoInfo
              console.log(this.newUserInfoInfo);
               changeInfo(data).then(res=>{
                 if(res.data.status == 0){
                   location.reload();
                 }})            
             return
          }
          
          }else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      changeSucess(){
         localStorage.removeItem('eleToken')
         location.reload();
         this.$router.push('/login')
      }
    }

    }

</script>

<style scoped>
.avatar{
  /* width: 100%; */
  height: 80px;
  line-height: 80px;
  display: flex;
  font-size: 20px;
  margin: 15px 0;
  /* justify-content: space-between; */
}
.avatar-text1{
  margin-right: 113px;
}
.avatar-text2{
  margin-right: 70px;
}
</style>