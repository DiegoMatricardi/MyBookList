<template>
  <div class="dashboard-page">
    <Navbar />

    <div class="content">
      <PerfilCard
        v-if="usuario"
        :usuario="usuario"
        @editar="editarPerfil"
      />

      <div v-else>
        <p>Usuário não encontrado. Faça login novamente.</p>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/AppNavbar.vue";
import PerfilCard from "@/components/PerfilCard.vue";

export default {
  name: "PerfilView",
  components: { Navbar, PerfilCard },
  data() {
    return {
      usuario: null
    };
  },
  created() {
    const user = localStorage.getItem("usuario");
    if (!user) {
      this.$router.push("/login");
    } else {
      this.usuario = JSON.parse(user);
    }
  },
  methods: {
    editarPerfil() {
      alert("Função de editar ainda não implementada 😉");
    }
  }
};
</script>

<style scoped>
.dashboard-page {
  display: flex;
  height: 100vh;
  background: #1c1c1c;
  color: #fff;
}

.content {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
