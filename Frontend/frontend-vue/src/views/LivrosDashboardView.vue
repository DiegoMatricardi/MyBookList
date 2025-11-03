<template>
  <div class="livros-page">
    <Navbar />

    <div class="content">
      <h1>Catálogo de Livros</h1>

      <div class="filtros">
        <input
          type="text"
          v-model="busca"
          @input="filtrarLivros"
          placeholder="Buscar livro pelo nome..."
          class="input-busca"
        />

        <select v-model="categoriaSelecionada" @change="filtrarLivros" class="select-categoria">
          <option value="">Todas as categorias</option>
          <option v-for="cat in categorias" :key="cat._id" :value="cat._id">
            {{ cat.nome }}
          </option>
        </select>

        <button class="botao-add" @click="irParaCadastro">+</button>
      </div>

      <div v-if="filtrados.length === 0" class="mensagem-vazia">
        Nenhum livro encontrado.
      </div>

      <div v-else class="livros-grid">
        <div v-for="livro in filtrados" :key="livro._id" class="livro-card">
          <img
            :src="livro.capa || '/Images/SemCapa.jpg'"
            alt="Capa do livro"
            class="capa"
            @error="e => e.target.src = '/Images/SemCapa.jpg'"
            />

          <h2>{{ livro.nome }}</h2>
          <p><strong>Categoria:</strong> {{ livro.categoria?.nome || "Sem categoria" }}</p>
          <p>{{ livro.descricao || "Sem descrição" }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Navbar from "../components/AppNavbar.vue";
    import axios from "axios";

    export default {
    components: { Navbar },
    data() {
        return {
        livros: [],
        filtrados: [],
        categorias: [],
        busca: "",
        categoriaSelecionada: "",
        usuario: null
        };
    },
    async created() {
        const user = localStorage.getItem("usuario");
        if (!user) {
        this.$router.push("/login");
        } else {
        this.usuario = JSON.parse(user);
        await this.carregarCategorias();
        await this.carregarLivros();
        }
    },
    methods: {
        async carregarCategorias() {
        try {
            const response = await axios.get("http://localhost:3000/categoria");
            this.categorias = response.data;
        } catch (error) {
            console.error("Erro ao carregar categorias:", error);
        }
        },
        async carregarLivros() {
        try {
            const response = await axios.get("http://localhost:3000/livro");
            this.livros = response.data;
            this.filtrados = response.data;
        } catch (error) {
            console.error("Erro ao carregar livros:", error);
        }
        },
        filtrarLivros() {
        const termo = this.busca.toLowerCase();

        this.filtrados = this.livros.filter(livro => {
            const nomeMatch = livro.nome.toLowerCase().includes(termo);
            const categoriaMatch =
            !this.categoriaSelecionada ||
            livro.categoria?._id === this.categoriaSelecionada ||
            livro.categoria === this.categoriaSelecionada;

            return nomeMatch && categoriaMatch;
        });
        },
        irParaCadastro() {
        this.$router.push("/livros/cadastrar");
        }
    }
    };
</script>

<style scoped>
    .livros-page {
    display: flex;
    height: 100vh;
    background: #1c1c1c;
    color: #fff;
    }

    .content {
    flex: 1;
    padding: 40px;
    }

    .filtros {
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
    }

    .input-busca {
    flex: 1;
    padding: 10px;
    border-radius: 8px;
    border: none;
    outline: none;
    font-size: 16px;
    }

    .select-categoria {
    padding: 10px;
    border-radius: 8px;
    border: none;
    font-size: 16px;
    background: #2a2a2a;
    color: #fff;
    }

    .botao-add {
    background: #4caf50;
    color: #fff;
    border: none;
    width: 45px;
    font-size: 24px;
    font-weight: bold;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
    }

    .botao-add:hover {
    background: #43a047;
    }

    .livros-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    }

    .livro-card {
    background: #2a2a2a;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
    }

    .capa {
    width: 100%;
    max-height: 250px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 10px;
    }

    .mensagem-vazia {
    color: #aaa;
    font-style: italic;
    }
</style>
