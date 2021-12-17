import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    meta: {layout: 'main'},
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
    meta: {layout: 'main'},
    component: () => import('../views/Categories')
  },
  {
    path: "/detail-record",
    name: "detail-record",
    meta: {layout: 'main'},
    component: () => import('../views/Detail-Record')
  },
  {
    path: "/history",
    name: "history",
    meta: {layout: 'main'},
    component: () => import('../views/History')
  },
  {
    path: "/planning",
    name: "planning",
    meta: {layout: 'main'},
    component: () => import('../views/Planning')
  },
  {
    path: "/record",
    name: "record",
    meta: {layout: 'main'},
    component: () => import('../views/Record')
  },
  {
    path: "/profile",
    name: "profile",
    meta: {layout: 'main'},
    component: () => import('../views/Profile')
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
