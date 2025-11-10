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
    .content-wrapper {
        flex: 1; 
        display: flex;
        justify-content: center; 
        align-items: center;
        padding: 20px;
    }

</style>