
import {Loading,Message} from 'element-ui'




let loading;
export function startLoading() {
  loading = Loading.service({
    lock: true,
    text: 'Loading…… ',
    background: 'rgba(0,0,0,0.7)'
  })
}
export function endLoading() {
  loading.close()
}

export function host(){
  return 'http://139.159.235.105:8889'
}

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://139.159.235.105:8889',
    timeout: 5000
  })

  // 2.过滤器（拦截器）
  // 所要实现拦截器的页面管理
  const animation = ['/api/users/login','/api/users/register','/my/userinfo/updatainfo','/my/userinfo/updatepwd','/article/upload']
  function isIn(url){
    for(let i = 0;i<animation.length;i++){
      if(url == animation[i]){
        return true
      }
    }
    return false
  }


  instance.interceptors.request.use(config => {
    if (isIn(config.url)) {
      startLoading();
    }
      // 开始加载动画
      if (localStorage.eleToken) {
        config.headers.Authorization = localStorage.eleToken
      }
    return config
  }, err => {
    Message.error('请求出错请稍后重试')
    endLoading()
    return Promise.reject(err)
  })


  instance.interceptors.response.use(response => {
    // 结束加载动画
    if (isIn(config.url)) {
      if (response.data.status == 1) {
        Message.error(response.data.message)
      } else {
        Message.success(response.data.message);
      }
      endLoading();
    }
    
    if(response.data.status == 401){
     
      localStorage.removeItem('eleToken')
      location.reload();
      // store.dispatch("setAuthenticated", false);
      // store.dispatch("setUser", '');
      
      // router.replace('/login')
      Message.error('登录失效，请重新登录')
    }

    return response;
  }, err => {
    endLoading();
    Message.error(err.date.message)
    // stoken
    
    return Promise.reject(err)
  })

  return instance(config)
}




export function getMessage(res) {
  if (res.data.status === 1) {
    Message.error(res.data.message)
  } else if (res.data.status === 0) {
    Message.success(res.data.message)
  }
}



export default axios;