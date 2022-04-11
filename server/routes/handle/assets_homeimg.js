const fs = require('fs')
const path = require('path')
const hostpath= require('./utils/host').host

// getAllDirs 传入本地目录，主机地址，路径url
// 返回数据 img 和 link
const {getAllDirs} = require('./utils/getallfile')


// const fa = require('../../assets/home_img')


exports.getHomeimg = (req,res)=>{
  
  const url = '/api/assets/homeimg/home_img/'
  const resourceUrl = 'preset/filmlut'

  let date = getAllDirs(path.join(__dirname,'../../assets/home_img'),hostpath,url,resourceUrl)

  res.send(date)
}

