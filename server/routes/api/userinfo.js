const express= require('express')
const router = express.Router() 

// 导入验证数据的中间件  : 主要验证是否符合数据的规则
const expressjoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const { update_userinfo_rule } = require('../../scheme/user')
const { update_userpwd_rule } = require('../../scheme/user')
// 获取用户基本信息
const userinfo_handle = require('../handle/userinfo_handle')
router.get('/userinfo',userinfo_handle.getUserInfo)

// 更新用户信息的路由
// 可以更新用户的邮箱以及username
router.post('/userinfo/updatainfo',expressjoi(update_userinfo_rule),userinfo_handle.updateUserInfo)

// 重置用户的密码模块
// oldPassword & newPassword
router.post('/userinfo/updatepwd',expressjoi(update_userpwd_rule),userinfo_handle.updateUserPwd)


module.exports = router