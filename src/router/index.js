import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vue2Emoji from 'vuejs-emoji'
import { emoji } from './../api/emoji.js'

import index from '@/components/index'
import headerTitle from '@/components/headerTitle'
import admin from '@/components/admin'

Vue.prototype.emoji = emoji

Vue.use(Router)
Vue.use(ElementUI)
Vue.use(Vue2Emoji)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/headerTitle/:formData',
      name: 'headerTitle',
      component: headerTitle
    },
    {
      path: '/admin/:isAdmin',
      name: 'admin',
      component: admin
    },
    {
      path: '/webStudy/:formData',
      name: 'webStudy',
      component: resolve => require(['@/components/webStudy'], resolve)
    },
    {
      path: '/pageContent/:id',
      name: 'pageContent',
      component: resolve => require(['@/components/pageContent'], resolve)
    },
    {
      path: '/aboutMe',
      name: 'aboutMe',
      component: resolve => require(['@/components/aboutMe'], resolve)
    },
    {
      path: '/leaveMessage',
      name: 'leaveMessage',
      component: resolve => require(['@/components/leaveMessage'], resolve)
    },
    {
      path: '/search/:formData',
      name: 'search',
      component: resolve => require(['@/components/search'], resolve)
    }
  ]
})
