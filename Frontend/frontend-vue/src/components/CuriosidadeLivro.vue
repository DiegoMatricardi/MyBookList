<template>
  <div class="curiosidade-page">
    <h1>Curiosidade de um livro</h1>

    <div v-if="loading" class="loading">Carregando...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="!hasRatedBooks" class="no-books">
      Você ainda não avaliou nenhum livro.
    </div>
    <div v-else class="curiosidade-card">
      <div class="capa-wrap">
        <img
          :src="capa || '/Images/SemCapa.jpg'"
          alt="Capa do livro"
          class="capa"
          @error="e => e.target.src = '/Images/SemCapa.jpg'"
        />
      </div>

      <div class="detalhes">
        <h2 class="titulo">{{ tituloLivro }}</h2>
        <p class="curiosidade"><strong>Curiosidade:</strong> {{ curiosidadeTexto }}</p>
        <button @click="buscarOutraCuriosidade">Outra curiosidade</button>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from '@/services/axiosInstance';

export default {
  name: 'CuriosidadeLivro',
  data() {
    return {
      usuario: null,
      ratedBooks: [],
      capa: '',
      curiosidadeObj: null,
      loading: false,
      error: ''
    };
  },
  computed: {
    hasRatedBooks() {
      return this.ratedBooks && this.ratedBooks.length > 0;
    },
    tituloLivro() {
      return this.curiosidadeObj && this.curiosidadeObj.Livro
        ? this.curiosidadeObj.Livro
        : '';
    },
    curiosidadeTexto() {
      return this.curiosidadeObj && this.curiosidadeObj.Curiosidade
        ? this.curiosidadeObj.Curiosidade
        : '';
    }
  },
  async created() {
    const user = localStorage.getItem('usuario');
    if (!user) {
      this.$router.push('/login');
      return;
    }
    this.usuario = JSON.parse(user);
    // Filtra apenas livros avaliados (assume item.nota existe e > 0)
    this.ratedBooks = (this.usuario.livros || []).filter(
      item => item && (item.nota !== undefined && item.nota !== null)
    );
    if (!this.hasRatedBooks) return;
    await this.buscarCuriosidadeAleatoria();
  },
  methods: {
    async buscarCuriosidadeAleatoria() {
      this.loading = true;
      this.error = '';
      try {
        const randIdx = Math.floor(Math.random() * this.ratedBooks.length);
        const escolhido = this.ratedBooks[randIdx];
        const livroId = escolhido.livro;

        // Usa timeout por requisição para evitar travar a página
        const resp = await this.requestWithTimeout(() => axiosInstance.get(`/livro/curiosidade/${livroId}`), 8000);

        this.capa = resp.data.livro || '';
        this.curiosidadeObj = resp.data.curiosidade || null;
      } catch (err) {
        console.error('Erro ao buscar curiosidade:', err);
        this.error = err.message === 'Timeout' ? 'Tempo esgotado. Tente novamente.' : 'Erro ao carregar curiosidade. Tente novamente.';
      } finally {
        this.loading = false;
      }
    },

    async buscarOutraCuriosidade() {
      if (!this.hasRatedBooks) return;
      await this.buscarCuriosidadeAleatoria();
    },

    // Mesmo helper do PerfilCard para timeout por requisição
    requestWithTimeout(fn, ms = 8000) {
      return new Promise((resolve, reject) => {
        let finished = false;

        const timer = setTimeout(() => {
          if (finished) return;
          finished = true;
          reject(new Error('Timeout'));
        }, ms);

        fn()
          .then(res => {
            if (finished) return;
            finished = true;
            clearTimeout(timer);
            resolve(res);
          })
          .catch(err => {
            if (finished) return;
            finished = true;
            clearTimeout(timer);
            reject(err);
          });
      });
    }
  }
};
</script>

<style scoped>
.curiosidade-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  min-height: 100vh;
  background: #1c1c1c;
  color: #fff;
}
.curiosidade-page h1 {
  color: #9fa8ff;
  margin-bottom: 20px;
}
.loading, .error, .no-books {
  margin-top: 20px;
  color: #ccc;
}
.curiosidade-card {
  display: flex;
  gap: 20px;
  background: #121212;
  padding: 20px;
  border-radius: 8px;
  align-items: center;
  max-width: 800px;
  width: 100%;
}
.capa-wrap {
  width: 180px;
  height: 260px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #222;
  border-radius: 6px;
  overflow: hidden;
}
.capa-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.no-cover {
  color: #888;
  padding: 10px;
}
.detalhes {
  flex: 1;
}
.titulo {
  color: #fff;
  margin: 0 0 10px 0;
}
.curiosidade {
  color: #ddd;
  margin-bottom: 15px;
}
button {
  background: #4d55eb;
  color: #fff;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  opacity: 0.9;
}
/* garante que a imagem de fallback siga o mesmo estilo */
.capa {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
