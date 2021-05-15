import VueRouter from 'vue-router'

const Dashboard = () => import('../views/dashboard.vue')

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Dashboard' }
  }
]

const router = new VueRouter({
  routes
})

export default router
