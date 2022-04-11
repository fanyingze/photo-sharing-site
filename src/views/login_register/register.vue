<template>
  <div class="register">
    <div class="from">
      <span class="from-title">Welcome</span>

      <el-form
        :model="registerUser"
        :rules="rules"
        ref="registerForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="E-mail:" prop="email">
          <el-input
            v-model="registerUser.email"
            placeholder="e-mail"
            size="small"
          ></el-input>
        </el-form-item>

        <el-form-item label="Name:" prop="username">
          <el-input
            v-model="registerUser.username"
            placeholder="username"
            size="small"
          ></el-input>
        </el-form-item>

        <el-form-item label="Password:" prop="password">
          <el-input
            type="password"
            v-model="registerUser.password"
            placeholder="password"
            size="small"
          ></el-input>
        </el-form-item>

        <el-form-item label="coPassword:" prop="password2">
          <el-input
            type="password"
            v-model="registerUser.password2"
            placeholder="confirm your password"
            size="small"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="submitForm('registerForm')" plain size="small"
            >Submit</el-button
          >
          
        </el-form-item>
      </el-form>
    </div>

    <div class="introduction" v-if="!isMobile">
      <div class="i-title">About</div>

      <div class="contact">
        <div class="i-email">E-mail :761545737@qq.com</div>
        <div class="i-wc">WeChat : fyz761545737</div>
      </div>

      <div class="i-h1">Hello and welcome to Film Preset</div>
      <div class="i-h2">
        Here you can find your favorite photos and film presets
      </div>
    </div>
  </div>
</template>


<script>
import {getMessage} from '@/network/request.js'
import {getRegister} from '@/network/register_login.js'

import { startLoading,endLoading } from '@/network/Loading/loading.js';

export default {
  name: "register",
  data() {
    var validatePass2=(rule,value,callback)=>{
      if(value !== this.registerUser.password){
        callback(new Error('The passwords are inconsistent'))
      }else{
        callback();
      }
    };
    return {
      registerUser: {
        username: "",
        email: "",
        password: "",
        identity: "",
        password2:""
      },
      rules: {
        email: [
          {type:'email',required:true,message:'Please fill in the correct email address',trigger:'blur'}
        ],
        username: [{required:true,message:'Please fill in the email',trigger:'blur'},
                {min:2,max:30,message:'The length is between 2 and 30 characters',trigger:'blur'}],
        password: [
          {required:true,message:'Please fill in the password',trigger:'blur'},{
            min:6,max:30,message:'The length is between 6 and 30 characters'
          }
        ],
        password2:[ {required:true,message:'Please fill in ',trigger:'blur'},
        {validator:validatePass2,trigger:'blur'}]
        ,
      }, 
    };
  },
  methods:{
    submitForm(formName){
      this.$refs[formName].validate(valid=>{
        if(valid){
          getRegister(this.registerUser).then(res=>{
            if(res.data.status == 0){
              this.$router.replace('/login')
            }
          })
        }else{
          console.log('error submit');
          return false;
        }
      })
    }
  },computed:{
    isMobile(){
        let w = window.innerWidth;
        if(w<600){
          return true
        }else if(w>=600){
          return false
        }
      }
  }
};
</script>


<style scoped>
.register {
  width: 80%;
  margin: 100px auto;
  display: flex;
  justify-content: space-between;
  font-family: "PingFang SC";
  color: #606266;
  font-size: 14px;
}
.from {
  width: 40%;
}
.introduction {
  width: 40%;
}
.from-title {
  padding-left: 40px;
  margin-bottom: 30px;
  font-size: 30px;
  color: #606266;
  display: block;
}
.i-title {
  margin-bottom: 20px;
  font-size: 30px;
  display: block;
}
.contact {
  margin-bottom: 30px;
}
.i-h1,
.i-h2 {
  font-weight: 200;
}
@media screen and  (max-width:600px){
  .from {
  width: 100%;
}
.from-title{
  text-align: center;
}
}
</style>