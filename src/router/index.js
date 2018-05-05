import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import allot from '@/components/business/allot'
import customer from '@/components/business/customer'
import hr from '@/components/company/hr'
import org from '@/components/company/org'
import post from '@/components/company/post'
import dictionary from '@/components/system/dictionary'
import log from '@/components/system/log'
import permission from '@/components/system/permission'
import role from '@/components/system/role'
import user from '@/components/system/sys_user/user'
import area from '@/components/system/sys_area/area'
import increment from '@/components/system/sys_increment/increment'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path: '/register',
      name: 'Register',
      component: Register
    },{
      path: '/allot',
      name: 'allot',
      component: allot
    },{
      path: '/customer',
      name: 'customer',
      component: customer
    },{
      path: '/hr',
      name: 'hr',
      component: hr
    },{
      path: '/org',
      name: 'org',
      component: org
    },{
      path: '/post',
      name: 'post',
      component: post
    },{
      path: '/dictionary',
      name: 'dictionary',
      component: dictionary
    },{
      path: '/log',
      name: 'log',
      component: log
    },{
      path: '/permission',
      name: 'permission',
      component: permission
    },{
      path: '/role',
      name: 'role',
      component: role
    },{
      path: '/user',
      name: 'user',
      component: user
    },{
      path: '/area',
      name: 'area',
      component: area
    },{
      path: '/increment',
      name: 'increment',
      component: increment
    }
  ]
})
