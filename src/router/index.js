import { createRouter, createWebHistory } from "vue-router";
import {getAuth} from "firebase/auth";

const routes = [
  {
    path: "/",
    name: "home",
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Home'),
  },
  {
    path: "/login",
    name: "login",
    meta: {layout: 'empty'},
    component: () => import('../views/Login')
  },
  {
    path: "/register",
    name: "register",
    meta: {layout: 'empty'},
    component: () => import('../views/Register')
  },
  {
    path: "/categories",
    name: "categories",
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Categories')
  },
  {
    path: "/detail/:id",
    name: "detail",
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Detail')
  },
  {
    path: "/history/:id",
    name: "history",
    meta: {layout: 'main', auth: true},
    component: () => import('../views/History')
  },
  {
    path: "/edit-lesson/:id",
    name: "edit-lesson",
    meta: {layout: 'main', auth: true},
    component: () => import('../views/EditCategory')
  },
  {
    path: "/planning",
    name: "planning",
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Planning')
  },
  {
    path: "/record",
    name: "record",
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Record')
  },
  {
    path: "/watch/:catId/:id",
    name: "watch",
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Watch')
  },
  {
    path: "/profile",
    name: "profile",
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Profile')
  },
  {
    path: "/catalog",
    name: "catalog",
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Catalog')
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const currentUser = getAuth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)
  if (requireAuth && !currentUser) {
    next('/login?message=login')
  } else next()
})

export default router;
