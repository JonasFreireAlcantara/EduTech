import VueRouter from 'vue-router'

const Dashboard = () => import('../views/dashboard.vue')
const Workspace = () => import('../views/workspace.vue')
const Login = () => import('../views/login.vue')
const Loginform = () => import('../views/loginform.vue')
const WorkspaceList = () => import('../views/workspaceList.vue')

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/workspace',
    name: 'Workspace',
    component: WorkspaceList
  },
  {
    path: '/workspace/:id',
    name: 'WorkspaceItem',
    component: Workspace
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/performlogin',
    name: 'PerformLogin',
    component: Loginform
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Login' }
  }
]

const router = new VueRouter({
  routes
})

export default router
