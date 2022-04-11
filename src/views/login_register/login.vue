<template>
  <div class="login">
    <div class="from" v-if="!isAuthenticated">
      <span class="from-title">Welcome Back</span>

      <el-form
        :model="loginUser"
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="E-mail:" prop="email">
          <el-input
            v-model="loginUser.email"
            placeholder="e-mail"
            size="small"
          ></el-input>
        </el-form-item>

        <el-form-item label="Password:" prop="password">
          <el-input
            type="password"
            v-model="loginUser.password"
            placeholder="password"
            size="small"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="submitForm('loginForm')" plain size="small"
            >Submit</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="logined" v-if="isAuthenticated">
      <img src="@/assets/img/login/login_out.png" alt="">
      <span class="jump">You have logged in to redirect for you</span>
      <a href="javascript:" @click="jumpToHome" class="jump">If the browser does not jump, please click here</a>
    </div>
  </div>
</template>


<script>
import jwt_decode from "jwt-decode";
import { getLogin } from "@/network/register_login.js";
import { getUserInfo } from "@/network/profile.js";
import { mapGetters } from "vuex";


export default {
  name: "login",
  created(){
    if(this.isAuthenticated){
      setTimeout(()=>{
        console.log('------');
        this.$router.push('/home')
      },2000)
    }
  },
  data() {
    return {
      loginUser: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          {
            type: "email",
            required: true,
            message: "Please fill in the correct email address",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password",
            trigger: "blur",
          },
          {
            min: 6,
            max: 30,
            message: "The length is between 6 and 30 characters",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.loginUser);
          getLogin(this.loginUser).then((res) => {
            const token = res.data.token;
            // 将登录储存在这里

            localStorage.setItem("eleToken", token);
            // 对token进行解析
            const decoded = jwt_decode(token);
            console.log("decoded内容为");
            console.log(decoded);
            // 将token存储在vuex中
            this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded));
            // this.$store.dispatch("setUser",decoded)

            if (res.data.status == 0) {
              getUserInfo().then((res) => {
                const userinfo = res.data.data;
                this.$store.dispatch("setUser", userinfo);
                this.$router.replace("/home");
              });
            }
          });
        } else {
          console.log("error submit");
          return false;
        }
      });
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    },jumpToHome(){
      this.$router.push('/home')
    }
  },
  computed:{
    ...mapGetters(["isAuthenticated","user"]),
    
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
.login {
  width: 40%;
  font-family: "PingFang SC";
  color: #606266;
  font-size: 14px;
  margin: 150px auto;
  position: relative;
}
.from {
  position: absolute;
  left: -5vw;
  width: 100%;
  text-align: center;
}
.from-title {
  padding-left: 95px;
  margin-bottom: 30px;
  font-size: 30px;
  color: #606266;
  display: block;
}
.logined img {
  width: 100px;
  transform: rotate(-7deg);
}
.logined a,span{
  display:block;
  font-size: 16px;
  color: #666666;
}
.logined{
  margin-left: -20px;
  width: 500px;
  text-align: center;
}
@media screen and  (max-width:600px){
  .login {
  width: 90%;
}
.from-title{
  text-align: center;
  margin-left: -13px;
}
}
</style>