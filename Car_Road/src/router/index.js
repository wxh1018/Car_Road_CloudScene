import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.use(Router)


var router = new Router({
  mode:'hash',
  routes: [
    {
      path: '/',
      name: 'index',
      redirect:'/index',
      component: ()=>import('@/views/index'),
      children:[
        {
          path:'/index',
          name:'yunkong',
          component:()=>import('@/views/yunkong'),
          meta:{
            title:'云控平台'
          },
          children:[
            {
              path:'/mapposition',
              name:'position',
              component:()=>import('@/views/index_compontent/MapPosi')
            }
          ]
        },
        {
          path:'/drive',
          name:'drive',
          component:()=>import('@/views/Drive'),
          meta:{
            title:'驾驶看板'
          }
        }
      ]
    }
  ],
})

router.beforeEach((to,from,next)=>{
  NProgress.start()
  if(to.matched.length === 0){
      from.name?next({name:from.name}):next('/');
  }else{
    var title = document.querySelector('title')
    title.text = to.meta.title
    next()
  }
})
router.afterEach((to,from,next)=>{
  NProgress.done()
})

export default router

