import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import index from '@/pages/index'
import layout from '@/pages/layout'
import role from '@/pages/role'
import user from '@/pages/user'

const menu =  ()=>import('@/pages/menu') 

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path:"/",
      component:layout,
      children:[{
        path:"index",
        component:index
      },{
        path:"menu",
        component:menu
      },{
        path:"role",
        component:role
      },{
        path:"user",
        component:user
      },{
        path:"*",
        redirect:"/index"
      }]
    }
  ]
})

router.beforeEach((to,from,next)=>{
  let token=localStorage.getItem("token");
  if(token){
    if(to.path=="/login"){
      next(false)
    }else{
      next()
    }
  }else{
    if(to.path=="/login"){
      next()
    }else{
      next("/login")
    }
  }
})

export default router;
