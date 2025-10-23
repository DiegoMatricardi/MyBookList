<template>
  <div class="dashboard-page">
    <Navbar />

    <div class="content">
      <h1>Bem-vindo, {{ usuario?.nome || "Usuário" }}</h1>
    </div>
  </div>
</template>

<script>
    import Navbar from "../components/AppNavbar.vue";
    export default {
        components: { Navbar },
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
    }
</style>
