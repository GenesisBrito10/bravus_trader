import { createRouter, createWebHistory } from 'vue-router'

// Importação das views
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
// import Settings from '../views/Settings.vue'
// import Tutorials from '../views/Tutorials.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { 
    path: '/dashboard',
    component: Dashboard,
    // meta: { requiresAuth: true }
  },
  // {
  //   path: '/settings',
  //   component: Settings,
  //   // meta: { requiresAuth: true }
  // },
  // {
  //   path: '/tutorials',
  //   component: Tutorials,
  //   // meta: { requiresAuth: true }
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('accessToken')) {
    next('/login')
  } else {
    next()
  }
})

export default router 