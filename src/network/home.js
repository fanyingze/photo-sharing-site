import {request} from './request';
// 这里需要用{}进行导入，原因：request.js里面的东西没有被default导出

export function getNotable(){
  // console.log(payload);
  return request({
    url:'/api/assets/homeimg'
  })
}