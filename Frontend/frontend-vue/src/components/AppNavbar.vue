<template>
  <aside class="navbar">
    <div class="logo">
      <i class="icon-book"></i>
      <h2>MyBookList</h2>
    </div>

    <nav class="menu">
      <router-link to="/dashboard" class="nav-item" active-class="active">
        <i class="icon-home"></i>
        <span>Início</span>
      </router-link>

      <router-link to="/livros" class="nav-item" active-class="active">
        <i class="icon-library"></i>
        <span>Livros</span>
      </router-link>

      <router-link to="/perfil" class="nav-item" active-class="active">
        <i class="icon-user"></i>
        <span>Perfil</span>
      </router-link>
    </nav>

    <div class="bottom">
      <button class="logout-btn" @click="logout">
        <i class="icon-logout"></i>
        <span>Sair</span>
      </button>
    </div>
  </aside>
</template>

<script>
  export default {
    name: "AppNavbar",
    methods: {
      logout() {
        localStorage.removeItem("usuario");
        this.$router.push("/");
      }
    }
  };
</script>

<style scoped>
  .navbar {
    width: 240px;
    height: 100vh;
    background: linear-gradient(180deg, #1f1f25, #131317);
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 30px 20px;
    box-shadow: 3px 0 15px rgba(0, 0, 0, 0.4);
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 700;
    font-size: 20px;
    letter-spacing: 1px;
    color: #9fa8ff;
  }
  .icon-book::before {
    content: "📚";
    font-size: 22px;
  }

  .menu {
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    gap: 10px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 8px;
    color: #ccc;
    text-decoration: none;
    font-weight: 500;
    transition: 0.25s;
  }

  .nav-item:hover {
    background: #2e2e3a;
    color: #fff;
    transform: translateX(3px);
  }

  .nav-item.active {
    background: #4d55eb;
    color: #fff;
    box-shadow: 0 0 10px rgba(77, 85, 235, 0.4);
  }

  .icon-home::before {
    content: "🏠";
  }
  .icon-library::before {
    content: "📖";
  }
  .icon-user::before {
    content: "👤";
  }
  .icon-logout::before {
    content: "🚪";
  }

  .bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 15px;
  }

  .logout-btn {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    background: none;
    border: none;
    color: #ff4d4f;
    font-weight: bold;
    font-size: 15px;
    cursor: pointer;
    transition: 0.25s;
    padding: 10px 16px;
    border-radius: 8px;
  }

  .logout-btn:hover {
    background: rgba(255, 77, 79, 0.1);
    transform: translateX(3px);
  }
</style>
