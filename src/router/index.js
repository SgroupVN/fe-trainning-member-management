import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/Dashboard.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/dashboard/Home.vue'),
      },
      {
        path: 'users',
        name: 'user-list',
        component: () => import('@/views/dashboard/users/UserList.vue'),
      },
      {
        path: 'users/:id',
        name: 'user-detail',
        component: () => import('@/views/dashboard/users/UserDetail.vue'),
      },
      {
        path: 'polls',
        name: 'polls',
      },
      {
        path: 'polls/:id',
        name: 'poll detail',
      },
      {
        path: 'settings',
        name: 'settings',
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not found',
    component: () => import('@/views/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes,
})

router.beforeEach((to) => {
  const token = localStorage.getItem('accessToken')

  if (to.name !== 'login' && to.name !== 'not found' && !token) return '/login'
  if (token && to.name === 'login') return '/'
})

export default router
