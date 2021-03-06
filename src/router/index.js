import Vue from 'vue';
import Router from 'vue-router';

import Index from '@/components/Index';
import Home from '@/components/Home';
import User from '@/components/User';
import Media from '@/components/Media';
import NotFound from '@/components/NotFound';
import ToDo from '@/components/ToDo';
import Add from '@/components/CreateUser';
import Reset from '@/components/ForgotPassword';

import store from '@/store';

Vue.use(Router);

const myRoutes = new Router({
  suppressTransitionError: true,
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/create-user',
      name: 'CreateUser',
      component: Add,
    },
    {
      path: '/reset',
      name: 'ResetPassword',
      component: Reset,
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/media',
      name: 'Media',
      component: Media,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/todo',
      name: 'ToDo',
      component: ToDo,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

myRoutes.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && (!sessionStorage.getItem('email'))) {
    return next('/');
  };
  next();
});

export default myRoutes;
