import Vue from 'vue'
import Router from 'vue-router'
import Body from '@/components/Body'
import Board from '@/components/Board'
import Person from '@/components/Person';
import { store } from '../store/index.js';

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/ematesearch/allsearch'
  },
  {
    path: '/ematesearch',
    redirect: '/ematesearch/allsearch'
  },
  {
    path: '/ematesearch/allsearch',
    name: 'Body',
    component: Body
  },
  {
    path: '/ematesearch/person',
    name: 'Person',
    component: Person,
    children: [
      {
        name: 'page',
        path: 'page',
        // component: BoardList,
        // props: true,
        beforeEnter(routeTo, routeFrom, next) {
          store.dispatch("pageSetting", { routeTo: routeTo })
          .then(() => {
            next('/ematesearch/' + store.state.data.class);
          })
          .catch(() => new Error("failed to fetch boardlist"));
        },
      },
    ]
  },
  {
    path: '/ematesearch/board',
    name: 'Board',
    component: Board,
    children: [
      {
        name: 'page',
        path: 'page',
        // component: BoardList,
        // props: true,
        beforeEnter(routeTo, routeFrom, next) {
          store.dispatch("pageSetting", { routeTo: routeTo })
            .then(() => {
              next('/ematesearch/' + store.state.data.class);
            })
            .catch(() => new Error("failed to fetch boardlist"));
        },
      },
    ]
  },
  {
    path: '/ematesearch/approval',
    name: 'Board',
    component: Board,
    children: [
      {
        name: 'page',
        path: 'page',
        // component: BoardList,
        // props: true,
        beforeEnter(routeTo, routeFrom, next) {
          store.dispatch("pageSetting", { routeTo: routeTo })
            .then(() => {
              next('/ematesearch/' + store.state.data.class);
            })
            .catch(() => new Error("failed to fetch boardlist"));
        },
      },
    ]
  },
  {
    path: '/ematesearch/mail',
    name: 'Board',
    component: Board,
    children: [
      {
        name: 'page',
        path: 'page',
        // component: BoardList,
        // props: true,
        beforeEnter(routeTo, routeFrom, next) {
          store.dispatch("pageSetting", { routeTo: routeTo })
          .then(() => {
            next('/ematesearch/' + store.state.data.class);
          })
          .catch(() => new Error("failed to fetch boardlist"));
        },
      },
    ]
  },
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
