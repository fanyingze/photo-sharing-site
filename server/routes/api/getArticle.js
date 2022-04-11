const express= require('express')
const router = express.Router() 


// 文章内容路由
const getArticleContent = require('../handle/article/article_handle').getArticleContent
router.get('/content',getArticleContent)

// 获取文章列表页面路由
// 传入获取文章的page参数
const getArticleList = require('../handle/article/article_handle').getArticleList
router.get('/list',getArticleList)

// 获取对应文章的作者信息
const getAuthor = require('../handle/article/article_handle').getAuthor
router.post('/author',getAuthor)


// 获取推荐列表中的用户头像
const getRecAvatar = require('../handle/article/article_handle').getRecAvatar
router.get('/recavatar',getRecAvatar)

//获取所有要查询对象
const searchArticle = require('../handle/article/article_handle').searchArticle
router.get('/search',searchArticle)

// 获取查询结果
const searchArticleResult = require('../handle/article/article_handle').searchArticleResult
router.get('/searchresult',searchArticleResult)

// 查询为您推荐的结果
const getRecArticle = require('../handle/article/article_handle').getRecArticle
router.get('/getrecarticle',getRecArticle)

// 获取某个用户的所有文章
const getSpecificUserArticles = require('../handle/article/article_handle').getSpecificUserArticles
router.get('/userarticle',getSpecificUserArticles)
module.exports = router