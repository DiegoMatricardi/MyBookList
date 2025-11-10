<template>
  <div class="livro-cadastro-page">
    <Navbar />

    <div class="content">
      <h1>Cadastrar Novo Livro</h1>

      <form class="form-cadastro" @submit.prevent="salvarLivro">
        <div class="campo">
          <label for="nome">Nome do Livro:</label>
          <input
            type="text"
            id="nome"
            v-model="livro.nome"
            required
            placeholder="Digite o nome do livro"
          />
        </div>

        <div class="campo">
          <label for="descricao">Descrição:</label>
          <textarea
            id="descricao"
            v-model="livro.descricao"
            placeholder="Escreva uma breve descrição"
          ></textarea>
        </div>

        <div class="campo">
          <label for="categoria">Categoria:</label>
          <select v-model="livro.categoria" required>
            <option value="">Selecione uma categoria</option>
            <option v-for="cat in categorias" :key="cat._id" :value="cat._id">
              {{ cat.nome }}
            </option>
          </select>
        </div>

        <div class="campo">
          <label for="capa">URL da Capa:</label>
          <input
            type="text"
            id="capa"
            v-model="livro.capa"
            placeholder="Ex: https://imagem.com/capa.jpg"
          />
        </div>

        <div class="botoes">
          <button type="submit" class="botao-salvar">Salvar</button>
          <button type="button" class="botao-voltar" @click="voltar">
            Voltar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/AppNavbar.vue";
import axios from "axios";

export default {
  name: "LivroCadastroView",
  components: { Navbar },
  data() {
    return {
      livro: {
        nome: "",
        descricao: "",
        categoria: "",
        capa: "",
      },
      categorias: [],
    };
  },
  async created() {
    try {
      const resp = await axios.get("http://localhost:3000/categoria");
      this.categorias = resp.data;
    } catch (err) {
      console.error("Erro ao carregar categorias:", err);
    }
  },
  methods: {
    async salvarLivro() {
      try {
        await axios.post("http://localhost:3000/livro", this.livro);
        alert("Livro cadastrado com sucesso!");
        this.$router.push("/livros");
      } catch (error) {
        console.error("Erro ao salvar livro:", error);
        alert("Erro ao cadastrar livro!");
      }
    },
    voltar() {
      this.$router.push("/livros");
    },
  },
};
</script>

<style scoped>
    .livro-cadastro-page {
        display: flex;
        height: 100vh;
        background: #1c1c1c;
        color: #fff;
    }

    .content {
        flex: 1;
        padding: 40px;
        margin-left: 100px; 
    }


    h1 {
        margin-bottom: 30px;
        color: #9fa8ff;
        margin-right: 180px;
    }


    .form-cadastro {
        background: #2a2a2a;
        padding: 25px;
        border-radius: 10px;
        max-width: 600px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
    }

    .campo {
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
    }

    label {
        margin-bottom: 8px;
        font-weight: bold;
        color: #ccc;
    }

    input,
    textarea,
    select {
        background: #1f1f25;
        color: #fff;
        border: 1px solid #333;
        border-radius: 8px;
        padding: 10px;
        font-size: 15px;
    }

    textarea {
        resize: none;
        height: 100px;
    }

    .botoes {
        display: flex;
        gap: 10px;
        margin-top: 20px;
    }

    .botao-salvar {
        background: #4caf50;
        color: #fff;
        border: none;
        padding: 10px 18px;
        border-radius: 8px;
        font-weight: bold;
        cursor: pointer;
        transition: 0.3s;
    }

    .botao-salvar:hover {
        background: #43a047;
    }

    .botao-voltar {
        background: #555;
        color: #fff;
        border: none;
        padding: 10px 18px;
        border-radius: 8px;
        font-weight: bold;
        cursor: pointer;
        transition: 0.3s;
    }

    .botao-voltar:hover {
        background: #666;
    }
</style>
