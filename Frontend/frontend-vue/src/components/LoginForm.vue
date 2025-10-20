<template>
  <div class="login-page">
    <div class="login-card">
      <h1>MyBookList</h1>
      <h2>Login</h2>
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="senha" type="password" placeholder="Senha" />
      <button @click="handleLogin">Entrar</button>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      senha: "",
      error: ""
    };
  },
  methods: {
    async handleLogin() {
      this.error = "";
      try {
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: this.email, senha: this.senha })
        });

        const data = await response.json();

        if (!response.ok) {
          this.error = data.message || "Erro ao logar";
          return;
        }

        console.log("Usuário logado:", data);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        this.$router.push("/dashboard");

      } catch (err) {
        console.error(err);
        this.error = "Erro de conexão com o backend";
      }
    }
  }
};
</script>

<style scoped>

.login-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1a1a1a, #333);
}

.login-card {
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

.login-card h1 {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #e2e3f3;
}

.login-card h2 {
  font-size: 22px;
  margin-bottom: 25px;
  color: #eee;
}

.login-card input,
.login-card button {
  width: 100%;
  max-width: 280px;
  margin: 0 auto 15px auto;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  transition: 0.3s;
}

.login-card input {
  border: 1px solid #555;
  background: #333;
  color: #eee;
}

.login-card input::placeholder {
  color: #aaa;
}

.login-card input:focus {
  border-color: #6b73ff;
  box-shadow: 0 0 5px rgba(107, 115, 255, 0.5);
  outline: none;
}

.login-card button {
  background: #777deb;
  color: #fff;
  font-weight: bold;
  border: none;
  cursor: pointer;
}

.login-card button:hover {
  background: #4d55eb;
}

.login-card .error {
  margin-top: 15px;
  color: #ff4d4f;
  font-weight: bold;
}
</style>
