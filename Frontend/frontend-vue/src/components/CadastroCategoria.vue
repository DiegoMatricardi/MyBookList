<template>
  <div class="categoria-page">
    <div class="categoria-card">
      <h2>Cadastrar Categoria</h2>
      <form @submit.prevent="handleCadastro" class="form-categoria">
       
          <input type="text" id="nome" v-model="nome" placeholder="Nome da Categoria" required />
        
          <button type="submit" @click="handleCategoria">Cadastrar</button>
        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="success" class="success">{{ success }}</p>

      </form>
    </div>
  </div>
</template>

<script>
    import axiosInstance from '@/services/axiosInstance';
    export default{
        data(){
            return {
            nome: "",
            error: "",
            success: ""
            };
        },
        methods: {
            async handleCategoria(){
                this.error=""
                this.success=""
                try{
                    const response = await axiosInstance.post("/categoria", {
                        nome: this.nome
                    });
                    if(response.status===201){
                      this.success="Categoria "+this.nome +" cadastrada com sucesso!"
                      this.nome=""
                    }
                    else{
                      this.error="Erro ao cadastrar categoria"
                    }
            }catch(err){
                if(err.response){
                    this.error= err.response.data.message || "Erro ao cadastrar categoria"
                }else{
                    this.error="Erro de conexão com o backend"
                }
                console.error(err)
            }
    }
        }
}

</script>

<style scoped>

.categoria-card {
  background: #222;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 15px 30px rgba(0,0,0,0.5);
  max-width: 400px;
  width: 100%;
  text-align: center;
  color: #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
}


/* Essencial: evita que padding faça o input "estourar" */
.categoria-card * {
  box-sizing: border-box;
}

.form-categoria {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}

.form-categoria input,
.form-categoria button {
  width: 100%;       /* ← Agora funciona sem quebrar */
  padding: 12px;
  margin: 12px 0;
  border-radius: 8px;
  font-size: 16px;
}

/* Input estilizado */
.form-categoria input {
  border: 1px solid #555;
  background: #333;
  color: #eee;
}

/* Botão estilizado */
.form-categoria button {
  background: #777deb;
  color: #fff;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.form-categoria button:hover {
  background: #4d55eb;
}


</style>