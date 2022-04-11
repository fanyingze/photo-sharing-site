const db = require('../../../db/index')
const url = require('url')
const http = require('http')
const { query } = require('../../../db/index')

exports.getArticleContent = (req,res)=>{
  const article_id = req.body.article_id
  const get_id = req.body.id
  const sql = 'select * from ev_articles where article_id = ?'
  db.query(sql,article_id,(err,results)=>{
    if(err) return res.cc(err)
    if(results.length == 0 ){
      return res.send({
        status:1,
        errnum:404,
        message:'对不起该文章不见了'
      })
    }
    const article_info = results[0]
    // 判断文章是否在草稿箱
    if(article_info.is_draft == 1 && get_id==article_info.author_id){
      return res.send(article_info)
    }else if(article_info.is_draft == 1 && get_id!==article_info.author_id){
      return res.send({
        status:1,
        errnum:404,
        message:'哎呀！这个文章还不存在'
      })
    }
    // 判断文章的状态是不是被删除了
    if(article_info.is_delete !== 0){
      return res.send({
        status:1,
        errnum:404,
        message:'对不起，该文章被风吹走了'
      })
    }
    
    res.send(article_info)
  })
  
  
}

exports.getArticleList = (req,res)=>{
  let query = url.parse(req.url,true).query
  let page = query.page
  let articleStart = 8*(page-1)
  // 每页查询15条，输入要查询的位次
  const sql = 'select * from ev_articles where is_delete != 1 order by article_id DESC limit ?,8'
  db.query(sql,articleStart,(err,results)=>{
    if(err) return res.cc(err)
    res.send(results)
  })
}
// 根据对应的返回文章的结果
exports.searchArticleResult=(req,res)=>{
  let query = url.parse(req.url,true).query
  
  const sql = 'select title as value,article_id from ev_articles where is_delete != 1'

  db.query(sql,(err,results)=>{

    if(err)return res.cc(err)
    let array = []
    for(let i =0;i<results.length;i++){
      let a = results[i].value

      if(a.indexOf(req.query.title)!== -1){
        array.push(results[i].article_id)
      }
    }

    if(array.length === 0){
      return res.send({status:404})
    }
    
    let array2 = []
    const sql2= 'select * from ev_articles where article_id = ?'
    for(let i =0;i<array.length;i++){
      db.query(sql2,array[i],(err,results)=>{
        if(err) return res.cc(err)
        if(results.length== 0)return res.cc('对不起没有找到')
        array2.push(results[0])
        if(i+1==array.length){
          res.send(array2)
        }
      })
    }
  })
}

exports.getAuthor = (req,res)=>{
  const id = req.body.id
  console.log(id);
  const sql = 'select username,avatar,info from users where id = ?'
  db.query(sql,id,(err,results)=>{
    if(err) return res.cc(err)
    res.send(results)
  })
}
exports.comment = (req,res)=>{
  
  const sql = 'insert into comment set ?'
  
  let com = req.body
  db.query(sql,req.body,(err,results)=>{
    if(err)return res.cc(err)
    if(results.affectedRows !== 1)return res.cc('评论失败')
    // 将id组装
    let com_id = results.insertId
    com.comment_id = com_id
    let com_json = {comment:JSON.stringify([com])}

  const sql2 = 'select comment from ev_articles where article_id = ?'
  const sql3 = 'update ev_articles set ? where article_id = ?'

  db.query(sql2,[req.body.article_id],(err,results)=>{
    if(err)return res.cc(err)
    if(results.length == 0 ){
      return res.cc('对不起，该文章被风吹走了')
    }
    if(results[0].comment === null){
      db.query(sql3,[com_json,req.body.article_id],(err,results)=>{
        if(err) return res.cc(err)
        return res.send(results)
      })
    }

    if(results[0].comment !== null){
      let oldArray = JSON.parse(results[0].comment)
      oldArray.push(com)
      let newArray_json = {comment:JSON.stringify(oldArray)}
      db.query(sql3,[newArray_json,req.body.article_id],(err,results)=>{
        if(err) return res.cc(err)
        return res.send(results)
      })
    }    

  })  
})
}

exports.getRecAvatar = (req,res)=>{

  // 获取最近发文章前10条的人
  const sql = 'SELECT author_id as id FROM ev_articles group by author_id order by COUNT(*) DESC  limit 0,10;'
  const sql2 = 'select avatar,username,id from users where FIND_IN_SET(id,?)'
  db.query(sql,(err,results)=>{
    if(err) return res.cc(err)
    let idarray = []
    for(let i =0;i<results.length;i++){
      const id = parseInt(results[i].id)
      idarray.push(id)
    }
    let newArray = []
    for(let i =0;i<idarray.length;i++){
      
      db.query(sql2,idarray[i],(err,results)=>{
        if(err) return res.cc(err)
        newArray.push(results[0])
        console.log(newArray);

        if(i+1 == idarray.length){
          res.send(newArray)
        }
        
      })
      
    }
    
  })
}

exports.searchArticle = (req,res)=>{
  const sql = 'select title as value,article_id from ev_articles where is_delete != 1'
  db.query(sql,(err,results)=>{
    if(err)re
    res.send(results)
  })
}

exports.getRecArticle = (req,res)=>{
  const sql = 'select * from ev_articles where is_delete != 1 order by rand() limit 8 ;'
  db.query(sql,(err,results)=>{
    if(err)return res.cc(err)
    if(results.length ==0)res.cc('获取推荐文章出错了')
    res.send(results)
  })
}

exports.getSpecificUserArticles=(req,res)=>{
  let query = url.parse(req.url,true).query

  const sql = 'select * from ev_articles where author_id = ? and is_delete != 1'
  db.query(sql,query.id,(err,results)=>{
    if(err)return res.cc(err)
    res.send(results)
  })
}

exports.deleteArticle = (req,res)=>{
  console.log(req.body);
  const id = req.body.article_id
  const de = {is_delete:1}
  const sql = "update ev_articles set ? where article_id= ? "
  db.query(sql,[de,id],(err,results)=>{
    if(err) return res.cc(err)
    if(results.affectedRows !== 1) return res.cc('删除失败，请稍后重试')
    res.send(results)
  })
}