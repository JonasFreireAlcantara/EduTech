import VueRouter from 'vue-router'

const Dashboard = () => import('../views/dashboard.vue')
const Workspace = () => import('../views/workspace.vue')

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/workspace',
    name: 'Workspace',
    component: Workspace
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
