import {request} from './request';
// 这里需要用{}进行导入，原因：request.js里面的东西没有被default导出

export function uploadArticle(payload){
  return request({
    url:'/article/upload',
    method:'post',
    data:payload
  })
}

export function deletePhoto(payload){
  // console.log(payload);
  return request({
    url:'/api/upload/deletephoto',
    method:'post',
    data:payload
  })
}

export function getArticle(article_id){
  return request({
    url:'/api/article/content',
    method:'get',
    params:{
      article_id
    }
  })
}

export function getArticleList(page){
  return request({
    url:'api/article/list',
    method:'get',
    params:{
      page
    }
  })
}

export function getAuthorAvatar(id){
  return request({
    url:'/api/article/author',
    method:'post',
    data:{id:id}
  })
}

export function submitComment(payload){
  return request({
    url:'/article/comment',
    method:'post',
    data:payload
  })
}

export function getRecAvatar(){
  return request({
    url:'/api/article/recavatar',
    method:'get'
  })
}

export function getSearchResult(){
  return request({
    url:'/api/article/search',
    method:'get'
  })
}

export function getSearchResultCB(title){
  return request({
    url:'/api/article/searchresult',
    method:'get',
    params:{
      title
    }
  })
}

export function getRecArticle(){
  return request({
    url:'/api/article/getrecarticle',
    method:'get'
  })
}

export function getSpecificUserArticles(id){
  return request({
    url:'/api/article/userarticle',
    method:'get',
    params:{
      id
    }
  })
}

export function deleteArticle(id){
  return request({
    url:'/article/delist',
    method:'post',
    data:id
  })
}