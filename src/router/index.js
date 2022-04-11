
import login from '@/views/login_register/login'
import register from '@/views/login_register/register'
import article  from '@/views/home/home'
import preset from '@/views/preset/preset'
import loginout from '@/views/login_register/loginout'
import profile from '@/views/profile/profile'
import publish from '@/views/article/publish'
import home from '@/views/article/article'
import userhome from '@/views/user/userhome'
import vivid160 from '@/views/film/vivid160'
import about from '@/views/About/about'
// import { component } from 'vue/types/umd'


const routes = [
  {
    path: '/',
    redirect:'/home',
    
  },{
    path:'/home',
    name:'home',
    component:home
  },{
    path:'/login',
    name:'login',
    component:login
  },{
    path:'/register',
    name:'register',
    component:register
  },{
    path:'/preset',
    name:'preset',
    component:preset
  },{
    path:'/loginout',
    name:'loginout',
    component:loginout
  },{
    path:'/profile',
    name:'profile',
    component:profile,
    children:[{
      path:'publish',
      name:'publish',
      component:publish
    }]
  },{
    path:'/article',
    name:'article',
    component:article
  },{
    path:'/userhome',
    name:'userhome',
    component:userhome
  },{
    path:'/preset/filmlut/0001vivid160',
    name:'vivid160',
    component:vivid160
  },{
    path:'/contact',
    name:'about',
    component:about
  }
  
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 路由守卫
router.beforeEach((to,from,next)=>{
  const isLogin = localStorage.eleToken ? true : false
  if(to.path == '/profile'){
    isLogin ? next() : next('/login')
    
  }else{
    next()
  }
})


export default router
