<template>
  <div class="perfil-page">
    <h1>Meu Perfil</h1>

    <div v-if="usuario" class="perfil-info">
      <div class="user-header">
        <div class="avatar">{{ initials }}</div>
        <h2>{{ usuario.nome }}</h2>
      </div>

      <div class="user-details">
        <p><strong>Email:</strong> {{ usuario.email }}</p>
        <p><strong>CPF:</strong> {{ usuario.cpf }}</p>
        <p><strong>Telefone:</strong> {{ usuario.telefone }}</p>
      </div>

      <div class="user-books" v-if="livros.length">
        <h3>Meus Livros</h3>
        <ul>
          <li v-for="(item, index) in livros" :key="index">
            <strong>{{ item.livro.nome }}</strong> - {{ item.nota }} ⭐
          </li>
        </ul>
      </div>

      <div v-else>
        <p>Você ainda não possui livros cadastrados.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from '@/services/axiosInstance';

export default {
  name: "PerfilView",
  data() {
    return {
      usuario: null,
      livros: []
    };
  },
  computed: {
    initials() {
      if (!this.usuario || !this.usuario.nome) return "";
      return this.usuario.nome
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase();
    }
  },
  async created() {
    // Pega o usuário do localStorage para ter o _id
    const user = localStorage.getItem("usuario");
    if (!user) {
      this.$router.push("/login");
    } else {
      this.usuario = JSON.parse(user);
      await this.carregarUsuario(); // Busca os dados atualizados do backend
    }
  },
  methods: {
    async carregarUsuario() {
      try {
        // 1️⃣ Busca usuário atualizado do backend
        const resp = await axiosInstance.get(`/usuario/${this.usuario._id}`);
        this.usuario = resp.data;

        // Atualiza o localStorage para manter sincronizado
        localStorage.setItem("usuario", JSON.stringify(this.usuario));

        // 2️⃣ Busca os livros com a nota
        await this.buscarLivros();
      } catch (err) {
        console.error("Erro ao carregar usuário:", err);
      }
    },
    async buscarLivros() {
      try {
        const livrosComNota = [];

        for (const item of this.usuario.livros) {
          const resp = await axiosInstance.get(`/livro/${item.livro}`);
          livrosComNota.push({
            livro: resp.data,
            nota: item.nota || 0
          });
        }

        this.livros = livrosComNota;
      } catch (err) {
        console.error("Erro ao buscar livros:", err);
        this.livros = [];
      }
    }
  }
};
</script>

<style scoped>
.perfil-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  min-height: 100vh;
  background: #1c1c1c;
  color: #fff;
}

.perfil-page h1 {
  margin-bottom: 30px;
  color: #9fa8ff;
  font-size: 32px;
}

.perfil-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.user-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.user-header .avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #4d55eb;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  font-weight: bold;
  color: #fff;
}

.user-header h2 {
  font-size: 28px;
  font-weight: 600;
  margin: 0;
}

.user-details p {
  font-size: 18px;
  margin: 4px 0;
}

.user-books {
  margin-top: 30px;
  width: 100%;
  max-width: 600px;
}

.user-books h3 {
  font-size: 24px;
  margin-bottom: 15px;
  color: #9fa8ff;
}

.user-books ul {
  list-style: none;
  padding: 0;
  display: flex;           
  flex-wrap: wrap;         
  gap: 15px;              
}

.user-books li {
  padding: 10px 15px;
  background: #222;
  border-radius: 8px;
  min-width: 200px;        
  flex: 1 1 200px;         
  text-align: center;
  transition: 0.2s;
}

.user-books li:hover {
  background: #4d55eb;
  color: #fff;
}
</style>
