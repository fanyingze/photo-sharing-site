import {request} from './request';
// 这里需要用{}进行导入，原因：request.js里面的东西没有被default导出

export function getRegister(payload){
  // console.log(payload);
  return request({
    url:'/api/users/register',
    method:'post',
    data:payload
  })
}
export function getLogin(payload){
  // console.log(payload);
  return request({
    url:'/api/users/login',
    method:'post',
    data:payload
  })
}

export function getProductData(type,page){
  return request({
    url:'home/data',
    params:{
      type,
      page
    }
  })
}
