// login & register
const express = require('express')
const router = express.Router();
const db = require('../../db/index');
// 引入头像插件
const gravatar = require('gravatar')
// 导入注册模块
const regUser = require('../handle/users_handle').regUser
const loginUser = require('../handle/users_handle').loginUser

// 导入验证数据的中间件  : 主要验证是否符合数据的规则
const expressjoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const {reg_login_rule} = require('../../scheme/user')


// 注册模块
router.post('/register',expressjoi(reg_login_rule), regUser)


// 登录模块
router.post('/login',expressjoi(reg_login_rule),loginUser)

module.exports = router