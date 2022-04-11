// 导入定义验证规则的包
const joi = require('joi')

// 定义用户名和密码的验证规则
const username = joi.string().min(5)
const password = joi.string().pattern(/^[\S]{6,18}$/).required()
const email = joi.string().pattern(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)


const info = joi.string()
const avatar = joi.string()
// 定义验证注册和登录表单数据的规则对象
exports.reg_login_rule = {
  body:{
    username,
    password,
    email
  }
}
exports.update_userinfo_rule = {
  body:{
    username,
    email,
    avatar,
    info
  }
}
exports.update_userpwd_rule = {
  body:{
    oldPassword:password,
    newPassword:password
  }
}
exports.update_useravatar_rule={
  body:{
    avatar
  }
}