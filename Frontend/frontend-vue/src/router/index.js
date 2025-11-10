import CadastroCategoria from '@/views/CadastroCategoriaview.vue';
import CadastroView from '@/views/CadastroView.vue';
import DashboardView from '@/views/DashboardView.vue';
import LoginView from '@/views/LoginView.vue';
import PerfilView from '@/views/PerfilView.vue';
import LivrosDashboardView from '@/views/LivrosDashboardView.vue';
import LivroCadastroView from '@/views/LivroCadastroView.vue';
import { createRouter, createWebHashHistory } from 'vue-router';

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
  },
  {
    path: '/cadastro-categoria',
    name: 'CadastroCategoria',
    component: CadastroCategoria
  },
  {
    path: '/livros',
    name: 'LivroDashboard',
    component: LivrosDashboardView
  },
  {
    path: "/livros/cadastrar",
    name: "LivroCadastroView",
    component: LivroCadastroView
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
