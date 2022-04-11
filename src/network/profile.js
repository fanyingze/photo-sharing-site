import {request} from './request';
// 这里需要用{}进行导入，原因：request.js里面的东西没有被default导出

export function getUserInfo(){
  
  return request({
    url:'/my/userinfo',
    method:'get',
  })
}



export function changePassword(payload){
  
  return request({
    url:'/my/userinfo/updatepwd',
    method:'post',
    data:payload
  })
}

export function changeInfo(payload){
  console.log(payload);
  return request({
    url:'/my/userinfo/updatainfo',
    method:'post',
    data:payload
  })
}
