import type { RouteRecordRaw } from 'vue-router'
import Default from '@/layout/Default.vue'

const authRoutes: RouteRecordRaw[] = [
  {
    component: () => import('../views/Login.vue'),
    path: '/login',
    name: 'login',
    meta: { requiresAuth: false }
  }
]

const mainRoutes: RouteRecordRaw[] = [
  {
    component: () => import('../views/HomeView.vue'),
    path: '/',
    name: 'home',
    alias: '/home',
    meta: { layout: Default, requiresAuth: false }
  },
  {
    component: () => import('../views/Categories.vue'),
    path: '/categories',
    name: 'categories',
    alias: '/categories',
    meta: { layout: Default, requiresAuth: false }
  },
  {
    component: () => import('../views/Courses.vue'),
    path: '/courses',
    name: 'courses',
    alias: '/courses',
    meta: { layout: Default, requiresAuth: false }
  },
  {
    component: () => import('../views/Register.vue'),
    path: '/register',
    name: 'register',
    alias: '/register',
    meta: { layout: Default, requiresAuth: false }
  },
  {
    component: () => import('../views/TermsOfService.vue'),
    path: '/terms-of-service',
    name: 'termsOfService',
    alias: '/terms-of-service',
    meta: { layout: Default, requiresAuth: false }
  },
  {
    component: () => import('../views/Lesson.vue'),
    path: '/courses/:id/lessons',
    name: 'course-lessons',
    alias: '/courses/:id/lessons',
    meta: { layout: Default, requiresAuth: false }
  },
  {
    component: () => import('../views/SingleLesson.vue'),
    path: '/lessons/:id',
    name: 'single-lesson',
    alias: "/lessons/:id",
    meta: { layout: Default, requiresAuth: false }
  },
  {
    component: () => import('../views/UserDashboard.vue'),
    path: '/user-dashboard/:id',
    name: 'user-dashboard',
    alias: "/user-dashboard/:id",
    meta: { layout: Default, requiresAuth: false }
  },
]

const accountRoutes: RouteRecordRaw[] = [
  {
    component: () => import('../views/Account.vue'),
    path: '/account',
    name: 'account',
    meta: { layout: Default, requiresAuth: true },
    children: [
      {
        component: () => import('../views/AccountInfo.vue'),
        path: '',
        name: 'account info',
        meta: { layout: Default, requiresAuth: true }
      },
      {
        component: () => import('../views/AccountChangePassword.vue'),
        path: 'change-password',
        name: 'change password',
        meta: { layout: Default, requiresAuth: true }
      }
    ]
  }
]

const allRoutes = [...mainRoutes, ...authRoutes, ...accountRoutes]

export default allRoutes
