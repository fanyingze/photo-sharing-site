const fs = require('fs')
const path = require('path')

exports.getAllDirs=(mypath=".",hostpath,url,resourceUrl)=>{
  let result = []
  console.log(mypath);
  const items = fs.readdirSync(mypath)
  for(let i =0;i<items.length;i++){
    let linkpath = items[i].substring(0,items[i].length-4) 
    let title = linkpath.substring(4,linkpath.length)
    let newpath = {src:hostpath+url+items[i],link:resourceUrl+'/'+linkpath,title:title}
    result.push(newpath)
  }
  return result
}