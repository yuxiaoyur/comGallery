import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'icon-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'icon-home' }
    }]
  }
]

export const asyncRouterMap = [
  {
    path: '/jsonEditor',
    component: Layout,
    redirect: '/jsonEditor',
    meta: { title: 'json编辑', icon: 'product-brand' },
    children: [{
      path: 'jsonEditor',
      name: 'jsonEditor',
      component: () => import('@/views/jsonEditor/index'),
      meta: { title: 'json编辑', icon: 'product-brand' }
    }]
  },
  {
    path: '/echart',
    component: Layout,
    redirect: '/echart/bar',
    name: 'echart',
    meta: { title: 'Echart', icon: 'product-brand' },
    children: [{
      path: 'bar',
      name: 'bar',
      component: () => import('@/views/echart/bar/index'),
      meta: { title: '柱图', icon: 'product-brand' }
    },{
      path: 'line',
      name: 'line',
      component: () => import('@/views/echart/line/index'),
      meta: { title: '折线图', icon: 'product-brand' },
      hidden: true
    },{
      path: 'editor',
      name: 'editor',
      component: () => import('@/views/echart/editor/index'),
      meta: { title: '折线图', icon: 'product-brand' },
      hidden: true
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

