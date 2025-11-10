<template>
  <transition name="fade">
    <div v-if="visivel" class="overlay" @click.self="$emit('fechar')">
      <div class="modal">
        <slot></slot>
        <button class="fechar" @click="$emit('fechar')">✕</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    visivel: { type: Boolean, required: true }
  }
};
</script>

<style scoped>
    .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999; 
    }

    .modal {
      background: #2a2a2a;
      color: #fff;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 0 25px rgba(0,0,0,0.8);
      max-width: 600px;
      width: 90%;
      position: relative;
      animation: subir 0.3s ease;
    }

    .fechar {
      position: absolute;
      top: 10px;
      right: 10px;
      background: none;
      border: none;
      color: #ccc;
      font-size: 22px;
      cursor: pointer;
      transition: 0.2s;
    }
    .fechar:hover {
      color: #fff;
    }

    @keyframes subir {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .fade-enter-active, .fade-leave-active {
      transition: opacity 0.3s;
    }
    .fade-enter-from, .fade-leave-to {
      opacity: 0;
    }
</style>
