import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import HomePage from './components/HomePage.vue';
import HelloWorld from './components/HelloWorld.vue';
import TriviaHome from './components/TriviaHome.vue';
import QuickPlay from './components/QuickPlay.vue';



const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/HelloWorld', component: HelloWorld },
    { path: '/TriviaHome', component: TriviaHome },
    { path: '/QuickPlay/:difficulty', component: QuickPlay}
  ]
});

createApp(App).use(router).mount('#app');

export default router;