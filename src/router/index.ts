import { createRouter, createWebHistory } from 'vue-router'
import SecondoEsercizio from '../views/SecondoEsercizio.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SecondoEsercizio
    }
  ]
})

export default router