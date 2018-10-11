import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/website',
    component: Layout,
    redirect: '/website/admin',
    name: 'Website',
    meta: { title: 'website', icon: 'link'},
    children: [{
      path: 'admin',
      component: () => import('@/views/website/admin'),
      name: 'admin',
      meta: { title: '管理员' }
    },{
      path: 'siteconfig',
      component: () => import('@/views/website/siteconfig'),
      name: 'siteconfig',
      meta: { title: '网站配置' }
    }]
  },

  {
    path: '/blog',
    component: Layout,
    redirect: '/blog/article',
    name: 'blog',
    meta: { title: 'blog', icon: 'link'},
    children: [{
      path: 'article',
      component: () => import('@/views/blog/article'),
      name: 'article',
      meta: { title: '文章' }
    },{
      path: 'category',
      component: () => import('@/views/blog/category'),
      name: 'category',
      meta: { title: '分类' }
    },{
      path: 'tag',
      component: () => import('@/views/blog/tag'),
      name: 'tag',
      meta: { title: '标签' }
    },{
      path: 'new',
      component: () => import('@/views/blog/articleEditor'),
      name: 'EditArticle',
      hidden: true,
      meta: { title: '编辑文章' }
    }]
  },

  {
    path: 'github',
    component: Layout,
    children: [
      {
        // path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        path: 'https://github.com/AceHe/',
        meta: { title: 'externalLink', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
