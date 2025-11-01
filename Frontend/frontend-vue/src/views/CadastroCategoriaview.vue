<template>
    <div class="cadpage">
    <Navbar/>

        <div class="content-wrapper">
            <CadastroCategoria />
        </div>
    </div>
</template>

<script>
    import CadastroCategoria from "../components/CadastroCategoria.vue";
    import Navbar from "@/components/AppNavbar.vue";
    export default{
        components:{
            Navbar,
            CadastroCategoria
          
        }
    };
</script>
<style scoped>

    .cadpage {
        display: flex;
        width: 100%;
        height: 100vh;
        background: linear-gradient(135deg, #1a1a1a, #333);
    }

    /* Área ao lado do menu */
    .content-wrapper {
        flex: 1; /* ocupa todo o espaço restante ao lado do menu */
        display: flex;
        justify-content: center; /* centro horizontal */
        align-items: center; /* centro vertical */
        padding: 20px;
    }

</style>