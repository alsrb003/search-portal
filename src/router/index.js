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
        name: 'personpage',
        path: 'page',
        // component: BoardList,
        // props: true,
        beforeEnter(routeTo, routeFrom, next) {
          store.dispatch("pageSetting", { routeTo: routeTo })
            .then(() => {
              next('/ematesearch/' + store.state.data.class + '?q=' + store.state.data.searchword);
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
        name: 'boardpage',
        path: 'page',
        // component: BoardList,
        // props: true,
        beforeEnter(routeTo, routeFrom, next) {
          store.dispatch("pageSetting", { routeTo: routeTo })
            .then(() => {
              next('/ematesearch/' + store.state.data.class + '?q=' + store.state.data.searchword);
            })
            .catch(() => new Error("failed to fetch boardlist"));
        },
      },
    ]
  },
  {
    path: '/ematesearch/approval',
    name: 'Approval',
    component: Board,
    children: [
      {
        name: 'approvalpage',
        path: 'page',
        // component: BoardList,
        // props: true,
        beforeEnter(routeTo, routeFrom, next) {
          store.dispatch("pageSetting", { routeTo: routeTo })
            .then(() => {
              next('/ematesearch/' + store.state.data.class + '?q=' + store.state.data.searchword);
            })
            .catch(() => new Error("failed to fetch boardlist"));
        },
      },
    ]
  },
  {
    path: '/ematesearch/research',
    name: 'Research',
    component: Board,
    children: [
      {
        name: 'researchpage',
        path: 'page',
        // component: BoardList,
        // props: true,
        beforeEnter(routeTo, routeFrom, next) {
          store.dispatch("pageSetting", { routeTo: routeTo })
            .then(() => {
              next('/ematesearch/' + store.state.data.class + '?q=' + store.state.data.searchword);
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
