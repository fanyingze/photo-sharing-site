const db = require('../../db/index')
const bcrypt = require('bcryptjs')


exports.getUserInfo = (req,res)=>{
  // 定义查询用户基本信息的语句
  const sql = 'select id , username , email , avatar,info from users where email = ? '
  // 调用db.query
  // 这个user是token生成的，在users_handle.js里面
  console.log(req.user);
  db.query(sql,req.user.email,(err,results)=>{
    if(err)return res.cc(err)
    if(results.length !== 1) return res.cc('获取用户信息失败')
    res.send({
      status:0,
      message:'获取用户信息成功',
      data:results[0]
    })
  })

  
}

// 更新用户其他基本信息
exports.updateUserInfo = (req,res)=>{
  console.log(req.body);
  const sql = 'update users set ? where id = ?'
  db.query(sql,[req.body,req.user.id],(err,results)=>{
    if(err) return res.cc(err)
    if(results.affectedRows !== 1)return res.cc('更新用户的基本信息失败')

    res.cc('更新用户信息成功',0)
  })
  
}

exports.updateUserPwd = (req,res)=>{
  // 需要验证老密码和新密码
  
  
  const sqlOldpwd = 'select password from users where id = ?'
  db.query(sqlOldpwd,req.user.id,(err,results)=>{
    if(err) return res.cc(err)
    if(results.length>0){
      // 查询老密码是否一致
      const compareResult = bcrypt.compareSync(req.body.oldPassword,results[0].password)
      if(!compareResult) return res.cc('原密码错误')
    }
    
    // 检测新密码是否与老密码相同
    const isSamePwd = bcrypt.compareSync(req.body.newPassword,results[0].password)
    if(isSamePwd) return res.cc('新密码与原密码相同，请重新输入')

    
    // 加密密码
    req.body.newPassword = bcrypt.hashSync(req.body.newPassword, 10)

   
    // 修改新的密码
    const sqlPwd = 'update users set password = ? where id = ?'
    
    db.query(sqlPwd,[req.body.newPassword,req.user.id],(err,results)=>{
      if(err) return res.cc(err)
      if(results.affectedRows !== 1)return res.cc('重置密码失败')

      res.cc('重置用户密码成功，请重新登录！',0)
    })
  })
}