const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const path = require('path')
// 解决跨域的问题
const cors = require('cors')
const joi = require('joi')
// 引入图片


// 中间件使用
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
// 静态资源
app.use('/api/assets/homeimg',express.static('./assets')) 
app.use('/api/public',express.static('./public'))

// 使用一个中间件，来发送错误消息
app.use((req,res,next)=>{
  res.cc = (err,status=1)=>{
    res.send({
      status,
      message:err instanceof Error ? err.message : err
    })
  }
  next()
})
// 要在路由之前配置解析Token的中间件
const expressJWT = require('express-jwt')
const config = require('./config')
app.use(expressJWT({secret:config.jwtSecretKey}).unless({path:[/^\/api/]}))


// 使用 users routes
const users = require('./routes/api/users')
app.use('/api/users',users)

// 使用用户信息的路由模块
const userinfo = require('./routes/api/userinfo')
app.use('/my',userinfo)

// 上传图片
const upload = require('./routes/api/upload')
app.use('/api/upload',upload)

// const imgUrl = require('./assets/home_img')
// 返回静态资源
const assets = require('./routes/api/assets')
app.use('/api/assets',assets)

// 公共获取文章路由
const getArticle = require('./routes/api/getArticle')
app.use('/api/article',getArticle)

// 文章路由
const article = require('./routes/api/article')
app.use('/article',article)


// 定义错误级别的中间件
app.use((err,req,res,next)=>{
  // 验证失败导致的错误
  // instanceof 是验证其是不是该类型
  if(err instanceof joi.ValidationError) return res.cc(err)
  // token中 UnauthorizedError信息
  if(err.name === 'UnauthorizedError')return res.send({
    status:401,
    message:'身份认证失效'
  })
  // 未知的错误
  else{ return res.cc(err) }
  
  
})


 const port = process.env.port || 7070;

app.listen(port,()=>{
  console.log('server running on http://127.0.0.1:7070');
})



