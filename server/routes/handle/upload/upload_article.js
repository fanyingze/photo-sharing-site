const db = require('../../../db/index')

exports.uploadArticle = (req,res)=>{
  // 上传日期
  let mydate = new Date();
  let curdate = mydate.toLocaleString();

  const info = req.body
  info.pub_date = curdate

  const sqlStr = 'insert into ev_articles set ?'
  db.query(sqlStr, info, (err, results) => {
    if (err) {
      return res.cc(err)
    }
    if (results.affectedRows !== 1) {
      return res.cc('对不起服务器出现错误')
    }
    res.send({
      message:'文章发布成功',
      status:0,
      data:results
    })
  })
}