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

        <button 
          v-if="usuario && usuario.email === 'admin@email.com'"
          class="botao-add" 
          @click="irParaCadastro"
        >
          +
        </button>
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
          <button class="botao-exibir" @click="abrirLivro(livro)">Detalhes</button>
        </div>
      </div>
    </div>
    <ModalComponent :visivel="modalAberto" @fechar="modalAberto = false">
      <div v-if="livroSelecionado">
        <img
          v-if="livroSelecionado.capa"
          :src="livroSelecionado.capa"
          alt="Capa do livro"
          class="capa-modal"
          @error="e => e.target.src = '/Images/SemCapa.jpg'"
        />
        <h2>{{ livroSelecionado.nome }}</h2>
        <p><strong>Categoria:</strong> {{ livroSelecionado.categoria?.nome || "Sem categoria" }}</p>
        <p>{{ livroSelecionado.descricao || "Sem descrição disponível" }}</p>
        <p><strong>Nota:</strong> <span class="estrelas">{{ gerarEstrelas(this.media) }}</span></p>
        <button class="botao-avaliar" @click="abrirAvaliacao">Avaliar</button>
      </div>
    </ModalComponent>
    <AvaliacaoModal
      :visivel="modalAvaliacaoAberto"
      :livro="livroSelecionado"
      :usuario="usuario"
      @fechar="modalAvaliacaoAberto = false"
      @avaliado="avaliacaoConcluida"
    />
  </div>
</template>

<script>
  import Navbar from "../components/AppNavbar.vue";
  import axios from "axios";
  import ModalComponent from "@/components/ModalComponent.vue";
  import AvaliacaoModal from "@/components/AvaliacaoModal.vue";
  export default {
    components: { Navbar,  ModalComponent, AvaliacaoModal},
    data() {
      return {
        livros: [],
        filtrados: [],
        categorias: [],
        busca: "",
        categoriaSelecionada: "",
        usuario: null,
        modalAberto: false,
        modalAvaliacaoAberto: false,
        livroSelecionado: null,
        media: 0
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
      },
      async calcularMedia(notas) {
        if (!notas || notas.length === 0) 
          return 0;
        let total = 0;
        for (let i = 0; i < notas.length; i++) {
          total += notas[i]; 
        }
        return total / notas.length;
      },
      async abrirLivro(livro) {
        this.media = await this.calcularMedia(livro.notas);
        this.livroSelecionado = livro;
        this.modalAberto = true;
      },
      gerarEstrelas(nota) {
        if (!nota || nota === 0) return "☆ ☆ ☆ ☆ ☆"; 
        const arredondado = Math.round(nota); 
        let estrelas = "";
        for (let i = 1; i <= 5; i++) {
          estrelas += i <= arredondado ? "⭐ " : "☆ ";
        }
        return estrelas.trim();
      },
      abrirAvaliacao() {
        this.modalAvaliacaoAberto = true;
      },
      avaliacaoConcluida() {
        this.carregarLivros(); 
      },
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

  .botao-exibir {
    background: #1543c0;
    color: #fff;
    border: none;
    width: 95px;
    font-size: 20px;
    font-weight: normal;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
  }

  .botao-exibir:hover {
    background: #0b1f79;
  }

  .botao-avaliar {
    background: #f5de13;
    color: #fff;
    border: none;
    width: 95px;
    font-size: 20px;
    font-weight: normal;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
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
  .capa-modal {
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
