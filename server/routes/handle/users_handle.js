const db = require('../../db/index');
// 导入生成的Token包
const jwt = require('jsonwebtoken')
// 导入全局的配置文件
const config = require('../../config')
const fs = require('fs')
const bcrypt = require('bcryptjs')
// 注册新用户处理函数
exports.regUser = (req, res) => {
  // 显示注册时间
  let mydate = new Date();
  let curdate = mydate.toLocaleString();

  const userinfo = req.body
  const sqlEmail = 'select email from users where email = ?'
  const sqlReg = 'insert into users set ?'
  // 判断输入是否合法
  if (!userinfo.username || !userinfo.password || !userinfo.email) {
    return res.cc('信息不合法')

  }


  // 判断邮箱是否已经存在
  db.query(sqlEmail, [userinfo.email], (err, results) => {
    if (err) return res.cc(err)
    if (results.length > 0) {
      return res.cc('邮箱已被占用')
    }

    // 调用bcrypt.hashSync()对密码进行加密处理  后面的是随机盐
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    // 插入用户信息
    db.query(sqlReg, { username: userinfo.username, password: userinfo.password, email: userinfo.email, date: curdate }, (err, results) => {
      if (err) {
        return res.cc(err)
      }
      if (results.affectedRows !== 1) {
        return res.cc('注册未成功，请稍后再试')
      }
      // 注册成功状态值等于0
      res.cc('注册成功', 0)
    })
  })



}

// 登录模块处理函数
exports.loginUser = (req, res) => {
  const sql = 'select id,email,password,username,avatar from users where email = ? '
  const userinfo = req.body
  db.query(sql, userinfo.email, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) {
      return res.cc('该邮箱未注册')
    }
    
    // userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    const compareResult = bcrypt.compareSync(userinfo.password,results[0].password)
    console.log(compareResult);
    if (!compareResult) {
      return res.cc('密码错误！')
    }

    // 在服务器端生成Token的字符串
    const user = {...results[0]}
    const tokenStr = jwt.sign(user,config.jwtSecretKey,{
      expiresIn:config.expiresIn
    })
    res.send({
      status:0,
      message:'登录成功,页面正在跳转...',
      token:'Bearer '+tokenStr
    }
    )
  })



  // res.send('成功登录')
}