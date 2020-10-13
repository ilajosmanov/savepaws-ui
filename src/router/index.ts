import Vue from 'vue';
import VueRouter, { R } from 'vue-router';
import { lazy } from './lib/lazy';
import { $isLoggedIn, loggedIn } from '../features/app';

Vue.use(VueRouter);

const routes: R[] = [
  {
    path: '/',
    name: 'HomePage',
    component: () => lazy(import('../views/Home/Page.vue')),
    props: (payload) => ({
      from: payload.query.redirectFrom ?? null,
    }),
    meta: {
      beforeResolve(to, from, next) {
        const isLoggedIn = $isLoggedIn.getState();

        if (!isLoggedIn || from.name) {
          loggedIn();
          next();
        } else {
          next({
            name: 'FindLocationPage',
          });
        }
      },
    },
  },

  {
    path: '/find-location',
    name: 'FindLocationPage',
    component: () => lazy(import('../views/FindLocation/Page.vue')),
  },

  {
    path: '/set-info',
    name: 'SetInfoPage',
    component: () => lazy(import('../views/SetInfo/Page.vue')),
    meta: {
      beforeResolve: (_, from, next) => {
        if (from.name) {
          next();
        } else {
          next({
            name: 'FindLocationPage',
          });
        }
      },
    },
  },

  {
    path: '/waiting',
    name: 'WaitingPage',
    component: () => lazy(import('../views/Waiting/Page.vue')),
    meta: {
      beforeResolve: (_, from, next) => {
        if (from.name) {
          next();
        } else {
          next({
            name: 'FindLocationPage',
          });
        }
      },
    },
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({
    x: 0,
    y: 0,
  }),
});

router.beforeResolve(async (to, from, next) => {
  try {
    // eslint-disable-next-line no-restricted-syntax
    for (const route of to.matched) {
      // eslint-disable-next-line no-await-in-loop, no-loop-func
      await new Promise((resolve, reject) => {
        if (!(route.meta && route.meta.beforeResolve)) {
          resolve();
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        route.meta.beforeResolve(to, from, (...args: any[]) => {
          if (args.length) {
            next(...args);
            reject(new Error('Redirected...'));
          } else {
            resolve();
          }
        });
      });
    }
  } catch (ex) {
    return Promise.reject(ex);
  }

  return next();
});

export {
  router,
};
