import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue';
import DashboardView from '@/views/DashboardView.vue'
import PerfilView from '@/views/PerfilView.vue'
import CadastroView from '@/views/CadastroView.vue'
const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: PerfilView
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    component: CadastroView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
