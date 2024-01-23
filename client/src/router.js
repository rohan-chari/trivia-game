import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import HomePage from './components/HomePage.vue';
import HelloWorld from './components/HelloWorld.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/HelloWorld', component: HelloWorld }
  ]
});

createApp(App).use(router).mount('#app');

export default router;