<template>
  <div class="dashboard-page">
    <Navbar />

    <div class="content">
      <PerfilCard
        v-if="usuario"
        :usuario="usuario"
        @editar="showEditModal = true"
      />

      <div v-else>
        <p>Usuário não encontrado. Faça login novamente.</p>
      </div>

      <!-- Modal de edição -->
      <UpdateUsuario
        v-if="showEditModal"
        :usuario="usuario"
        @close="showEditModal = false"
        @saved="onUsuarioSaved"
      />
    </div>
  </div>
</template>

<script>
import PerfilCard from "@/components/PerfilCard.vue";
import UpdateUsuario from "@/components/UpdateUsuario.vue";
import Navbar from "../components/AppNavbar.vue";

export default {
  name: "PerfilView",
  components: { Navbar, PerfilCard, UpdateUsuario },
  data() {
    return {
      usuario: null,
      showEditModal: false
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
    onUsuarioSaved(updatedUser) {
      // atualiza local e fecha modal
      this.usuario = updatedUser;
      localStorage.setItem("usuario", JSON.stringify(this.usuario));
      this.showEditModal = false;
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
