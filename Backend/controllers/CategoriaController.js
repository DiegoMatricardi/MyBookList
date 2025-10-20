import path from "path";
import Categoria from "../models/categoria.js";
import __dirname from "../utils/pathUtils.js";

class CategoriaController{
    static async getAllCategorias(req, res){
        try{
            const categorias = await Categoria.findAll();
            return res.json(categorias);
        }catch(error){
            console.error('Erro ao buscar as categorias: ',error);
            res.status(500).json({message: 'Erro interno ao buscar categorias'});
        }
    }

    static async getById(req, res){
        try{
            const {id} = req.params;
            const categoria = Categoria.findById(id);
            if(!categoria){
                return res.status(404).json({message: 'Categoria não encontrado!'});
            }
            return res.json(livro);
        }catch(error){
            console.error("Erro ao buscar categoria:", error);
            return res.status(500).json({ message: "Erro interno ao buscar categoria" });
        }
    }

    static async createCategoria(req, res){
        try{
            const {nome} = req.body;
            if (!nome) {
                return res.status(400).json({ message: "O nome da categoria é obrigatório!" });
            }
            const novaCategoria = new Categoria(nome);
            const categoriaSalva = await novaCategoria.save();
            return res.status(201).json(categoriaSalva);
        }catch(error){
            console.error("Erro ao criar categoria:", error);
            return res.status(500).json({ message: "Erro interno ao criar categoria" });
        }
    }

    static async updateCategoria(req, res) {
        try {
            const { id } = req.params;
            const dadosAtualizados = req.body;

            const categoriaAtualizada = await Categoria.update(id, dadosAtualizados);

            if (!categoriaAtualizada) {
                return res.status(404).json({ message: "Categoria não encontrada!" });
            }

            return res.status(200).json(categoriaAtualizada);
        } catch (error) {
            console.error("Erro ao atualizar categoria:", error);
            return res.status(500).json({ message: "Erro interno ao atualizar categoria" });
        }
    }

    static async deleteCategoria(req, res) {
        try {
            const { id } = req.params;
            const categoriaDeletada = await Categoria.delete(id);

            if (!categoriaDeletada) {
                return res.status(404).json({ message: "Categoria não encontrada!" });
            }

            return res.status(200).json({ message: "Categoria removida com sucesso!" });
        } catch (error) {
            console.error("Erro ao remover categoria:", error);
            return res.status(500).json({ message: "Erro interno ao remover categoria" });
        }
    }
}

export default CategoriaController;