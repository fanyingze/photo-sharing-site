const host = require('../utils/host').host
const fs = require('fs')
const path = require('path')

exports.uploadPhoto = (req,res)=>{
  const files = req.files
  const fileList = []
  const urlPath = host+'/api/public/imgs/photo/'
  console.log(files);
  for(let i =0;i<files.length;i++){
    const imgUrl = urlPath+files[i].filename
    const fileDetail = {filename:files[i].filename,path:imgUrl}
    fileList.push(fileDetail)
  }
  res.send(fileList)
}


exports.deletePhoto = (req,res)=>{

  const filePath =  path.join(__dirname,'../../../public/imgs/photo/')
  const filename = req.body.filename
  const fileadress = filePath + filename
  fs.unlink(fileadress,(err)=>{
    if(err){
      return res.cc(err)
    }
    res.cc('上传成功')
  })
  
}