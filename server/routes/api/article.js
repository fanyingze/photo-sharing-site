const express= require('express')
const router = express.Router() 

// 上传文章页面路由
// 上传成功后，返回message,status,insertId 
const uploadArticle = require('../handle/upload/upload_article').uploadArticle
router.post('/upload',uploadArticle)

// 文章评论路由
const comment = require('../handle/article/article_handle').comment
router.post('/comment',comment)



// 文章删除路由
const deleteArticle = require('../handle/article/article_handle').deleteArticle
router.post('/delist',deleteArticle)



module.exports = router