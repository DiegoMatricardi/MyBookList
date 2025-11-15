<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal">
      <h2>Editar Perfil</h2>

      <form @submit.prevent="salvar">
        <label>Nome</label>
        <input v-model="form.nome" required />

        <label>Email</label>
        <input v-model="form.email" type="email" required />

        <label>CPF</label>
        <input v-model="form.cpf" />

        <label>Telefone</label>
        <input v-model="form.telefone" />

        <div class="actions">
          <button type="button" class="btn-secondary" @click="close" :disabled="loading">Cancelar</button>
          <button type="submit" class="btn-primary" :disabled="loading">
            <span v-if="loading">Salvando...</span>
            <span v-else>Salvar</span>
          </button>
        </div>

        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axiosInstance from '@/services/axiosInstance';

export default {
  name: 'UpdateUsuario',
  props: {
    usuario: { type: Object, required: true }
  },
  data() {
    return {
      form: {
        nome: this.usuario.nome || '',
        email: this.usuario.email || '',
        cpf: this.usuario.cpf || '',
        telefone: this.usuario.telefone || ''
      },
      loading: false,
      error: ''
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    async salvar() {
      this.error = '';
      this.loading = true;
      try {
        // usa a rota /Usuario/:id conforme informado
        const resp = await axiosInstance.put(`/Usuario/${this.usuario._id}`, this.form);
        this.$emit('saved', resp.data);
      } catch (err) {
        console.error('Erro ao atualizar usuário:', err);
        this.error = err.response?.data?.message || 'Erro ao salvar. Tente novamente.';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal {
  background: #0f0f14;
  padding: 20px;
  border-radius: 8px;
  width: 420px;
  color: #fff;
  box-shadow: 0 8px 30px rgba(0,0,0,0.6);
}
.modal h2 {
  margin-top: 0;
  color: #9fa8ff;
}
label {
  display: block;
  margin-top: 10px;
  color: #ccc;
  font-size: 13px;
}
input {
  width: 100%;
  padding: 8px;
  margin-top: 6px;
  border-radius: 6px;
  border: 1px solid #333;
  background: #0b0b0d;
  color: #fff;
}
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
}
.btn-primary {
  background: #4d55eb;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
}
.btn-secondary {
  background: transparent;
  border: 1px solid #444;
  color: #ccc;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
}
.error {
  color: #ff8a8a;
  margin-top: 10px;
  font-size: 13px;
}
</style>
