const host = require('../utils/host').host


exports.uploadAvatar = (req,res)=>{
  console.log('a');
  const file = req.file
  const urlPath = host+'/api/public/imgs/avatar/'+file.filename
  res.send(urlPath)
}