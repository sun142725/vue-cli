import Vue from 'vue'
import Router from 'vue-router'
import Keep from '@/components/keep/Keep'
import Contact from '@/components/Contact'
import Register from '@/components/Register'
import ChatRoom from '@/components/chatRoom/ChatRoom'
import Login from '@/components/Login'
Vue.use(Router);

const router = new Router({
    mode: 'history',
  routes: [
      {
          path:'/chatRoom',
          name:'chatRoom',
          component:ChatRoom,
      },
      {
          path:'/login',
          name:'login',
          component:Login,
      },
      {
        path:'/register',
          name:'register',
          component:Register,
      },
    {
      path: '/',
      redirect: '/keep'
    },
      {
          path: '/keep',
          name: 'keep',
          component: Keep
      },
      {
          path: '/contact',
          name: 'contact',
          component: Contact
      },
  ]
});
router.beforeEach((to, from, next)=> {
    if (to.name === 'login' || to.name === 'register') {
        next();
    } else {
        //
        if (localStorage._chat_user) {
            next();
        } else {
            router.push({path: 'login'});
        }
    }
});
export default router;