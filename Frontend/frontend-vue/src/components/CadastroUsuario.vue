<template>
  <div class="Cadastro-page">
    <div class="Cadastro-card">
      <h1>MyBookList</h1>
      <h2>Criar Conta</h2>

      <input v-model="nome" type="text" placeholder="Nome completo" />
      <input v-model="cpf" type="text" placeholder="CPF" />
      <input v-model="telefone" type="text" placeholder="Telefone" />
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="senha" type="password" placeholder="Senha" />

      <input v-model="cep" type="text" placeholder="CEP" />
      <input v-model="cidade" type="text" placeholder="Cidade" />
      <input v-model="endereco" type="text" placeholder="Endereço" />

      <button @click="handleRegister">Cadastrar</button>

      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
       <p>Deseja voltar pro login ? <router-link to="/"> Login</router-link></p>
    </div>
  </div>
</template>

<script>
import axiosInstance from '@/services/axiosInstance';
import axiosCEPInstance from '@/services/axiosCEPInstance';

export default {
  data() {
    return {
      nome: "",
      cpf: "",
      telefone: "",
      email: "",
      senha: "",
      cep: "",
      cidade: "",
      endereco: "",
      error: "",
      success: ""
    };
  },
  watch: {
    cep(newCep) {
      if (newCep.length === 8) {
        this.buscarEndereco();
      }
    }
  },
  methods: {
    async buscarEndereco() {
      try {
        const { data } = await axiosCEPInstance.get(`${this.cep}/json/`);

        if (data.erro) {
          this.error = "CEP não encontrado!";
          this.cidade = "";
          this.endereco = "";
          return;
        }

        this.error = "";
        this.cidade = data.localidade;
        this.endereco = data.logradouro || "Rua não especificada";
      } catch {
        this.error = "Erro ao buscar CEP!";
      }
    },

    async handleRegister() {
      this.error = "";
      this.success = "";

      try {
        const response = await axiosInstance.post("http://localhost:3000/Usuario", {
          nome: this.nome,
          cpf: this.cpf,
          telefone: this.telefone,
          email: this.email,
          senha: this.senha,
          cep: this.cep,
          cidade: this.cidade,
          endereco: this.endereco
        });

        console.log("Usuário cadastrado:", response.data);

        this.success = "Cadastro realizado com sucesso!";
        setTimeout(() => this.$router.push("/"), 1500);

      } catch (err) {
        if (err.response) {
          this.error = err.response.data.message || "Erro ao cadastrar";
        } else {
          this.error = "Erro de conexão com o backend";
        }
        console.error(err);
      }
    }
  }
};
</script>


<style scoped>
.Cadastro-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1a1a1a, #333);
}

.Cadastro-card {
  background: #222;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 15px 30px rgba(0,0,0,0.5);
  width: 360px;
  text-align: center;
  color: #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.Cadastro-card h1 {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #e2e3f3;
}

.Cadastro-card h2 {
  font-size: 22px;
  margin-bottom: 25px;
  color: #eee;
}

.Cadastro-card input,
.Cadastro-card button {
  width: 100%;
  max-width: 280px;
  margin: 0 auto 12px auto;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  transition: 0.3s;
}

.Cadastro-card input {
  border: 1px solid #555;
  background: #333;
  color: #eee;
}

.Cadastro-card input::placeholder {
  color: #aaa;
}

.Cadastro-card input:focus {
  border-color: #6b73ff;
  box-shadow: 0 0 5px rgba(107, 115, 255, 0.5);
  outline: none;
}

.Cadastro-card button {
  background: #777deb;
  color: #fff;
  font-weight: bold;
  border: none;
  cursor: pointer;
}

.Cadastro-card button:hover {
  background: #4d55eb;
}

.error {
  margin-top: 10px;
  color: #ff4d4f;
  font-weight: bold;
}

.success {
  margin-top: 10px;
  color: #4dff88;
  font-weight: bold;
}
</style>
