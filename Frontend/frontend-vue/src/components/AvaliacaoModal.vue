<template>
  <div v-if="visivel" class="modal-overlay">
    <div class="modal">
      <h2>Avaliar "{{ livro?.nome }}"</h2>

      <div class="numeros">
        <span
          v-for="n in 5"
          :key="n"
          class="numero"
          @mouseover="hoverNota = n"
          @mouseleave="hoverNota = 0"
          @click="setNota(n)"
          :style="{ backgroundColor: n <= (hoverNota || nota) ? '#4caf50' : '#444' }"
        >
          {{ n }}
        </span>
      </div>

      <div class="botoes">
        <button @click="enviarAvaliacao" class="confirmar">Confirmar</button>
        <button @click="$emit('fechar')" class="cancelar">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    visivel: Boolean,
    livro: Object,
    usuario: Object
  },
  data() {
    return {
      nota: 0,
      hoverNota: 0
    };
  },
  methods: {
    setNota(valor) {
      this.nota = valor;
    },
    async enviarAvaliacao() {
      if (!this.nota) {
        alert("Por favor, selecione uma nota!");
        return;
      }
      try {
        await axios.post(
            `http://localhost:3000/usuario/${this.usuario._id}/avaliar/${this.livro._id}`,
            { nota: this.nota }
        );

        alert("Avaliação enviada com sucesso!");
        this.$emit("avaliado");
        this.$emit("fechar");
      } catch (error) {
        console.error("Erro ao enviar avaliação:", error);
        alert("Erro ao enviar avaliação.");
      }
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal {
  background: #2a2a2a;
  color: white;
  padding: 30px;
  border-radius: 12px;
  width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  text-align: center;
}

.numeros {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.numero {
  width: 45px;
  height: 45px;
  border-radius: 10px;
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #444;
  cursor: pointer;
  color: white;
  transition: all 0.2s ease;
}

.numero:hover {
  transform: scale(1.1);
}

.botoes {
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
}

.confirmar {
  background: #4caf50;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  color: white;
  cursor: pointer;
}

.cancelar {
  background: #f44336;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  color: white;
  cursor: pointer;
}
</style>
