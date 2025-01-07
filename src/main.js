import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'
import { store } from './store/store'
import './style.css'
import App from './App.vue'

const Home = () => import('./views/Home.vue');
const AddUser = () => import('./views/AddUser.vue');
const UpdateAllergies = () => import('./views/UpdateAllergies.vue');
const UpdateEmail = () => import('./views/UpdateEmail.vue');
const UpdatePhone = () => import('./views/UpdatePhone.vue');
const NotFound = () => import('./views/404.vue');

const routes = [
  { path: '/', component: Home },
  { path: '/add-user', component: AddUser },
  { path: '/update-allergies/:id', component: UpdateAllergies, props: true },
  { path: '/update-email/:id', component: UpdateEmail, props: true },
  { path: '/update-phone/:id', component: UpdatePhone, props: true },
  { path: '/:catchAll(.*)*', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).use(store).mount('#app')
