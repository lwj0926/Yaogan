import Vue from 'vue'
import Router from 'vue-router'



Vue.use(Router)



export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/shouye/index'),
  },
  // {
  //   path: '/detail',
  //   component: () => import('@/views/secondshow/index'),
  // },
  {
    path: '/analyse',
    component: () => import('@/views/analyse/index'),
  },
  {
    path: '/show',
    component: () => import('@/views/show/index'),
  },
  { path: '*', redirect: '/404', hidden: true }

]

export const asyncRoutes = []


const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
