const express= require('express')
const router = express.Router() 
const path = require('path')
const fs = require('fs')

const multer = require('multer')
const { fstat } = require('fs')

// 更换头像的，返回更换头像的url
const uploadAvatar = require('../handle/upload/upload_avatar').uploadAvatar
const uploader_avatar = multer({
  dest:path.join(__dirname,'../../public/imgs/avatar')
})
router.post('/avatar',uploader_avatar.single('avatar'),uploadAvatar)




// 上传照片的，返回图片的地址数组
const uploadPhoto = require('../handle/upload/upload_photo').uploadPhoto
const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,path.join(__dirname,'../../public/imgs/photo'))
  },
  filename:function(req,file,cb){
    let extend = file.mimetype.substring(6,file.mimetype.length)
    cb(null,file.fieldname+'-'+Date.now()+'.'+extend)
  }
})
// const uploader_photo = multer({
//   dest:path.join(__dirname,'../../public/imgs/photo'),
// })
const uploader_photo = multer({storage:storage})

router.post('/photo',uploader_photo.array('photo',10),uploadPhoto)

// 删除当前照片
const deletePhoto = require('../handle/upload/upload_photo').deletePhoto
const { func } = require('joi')
router.post('/deletephoto',deletePhoto)


module.exports = router