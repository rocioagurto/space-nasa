import Vue from 'vue'
import VueRouter from 'vue-router'
import Apod from '../views/Apod.vue'
import Firebase from 'firebase'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/apod',
    name: 'Apod',
    component: Apod,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/rover',
    name: 'MarsRoverPhotos',
    component: () => import(/* webpackChunkName: "login" */ '../views/MarsRoverPhotos.vue'),
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "login" */ '../views/Home.vue')
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "notfound" */ '../views/NotFound.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let user = Firebase.auth().currentUser;
  let authRequired = to.matched.some(route => route.meta.requireLogin);

  if(!user && authRequired){
    next('/')
  } else{
    next();
  }
})
export default router
