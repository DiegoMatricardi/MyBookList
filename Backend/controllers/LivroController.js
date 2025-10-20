import path from "path";
import Livro from "../models/livros.js";
import Categoria from "../models/categoria.js";
import __dirname from "../utils/pathUtils.js";

class LivroController{
    static async getAllLivros(req, res){
        try{
            const livros = await Livro.findAll();
            return res.json(livros);
        }catch(error){
            console.error('Erro ao buscar os livros: ',error);
            res.status(500).json({message: 'Erro interno ao buscar livros'})
        }
    }

    static async getById(req, res){
        try{
            const {id} = req.params;
            const livro = Livro.findById(id);
            if(!livro){
                return res.status(404).json({message: 'Livro não encontrado!'});
            }
            return res.json(livro);
        }catch(error){
            console.error("Erro ao buscar livro:", error);
            return res.status(500).json({ message: "Erro interno ao buscar livro" });
        }
    }

    static async createLivro(req, res){
        try{
            const {nome, categoria, descricao = "", notas = [], usuarios = [], capa = ""} = req.body;
            const categoriaExiste = await Categoria.findById(categoria);
            if(!categoriaExiste){
                return res.status(404).json({ message: "Categoria não encontrada!" });
            }
            const novoLivro = new Livro({
                nome, 
                categoria,
                descricao,
                notas,
                usuarios,
                capa
            });
            const livroSalvo = await novoLivro.save();
            return res.status(201).json(livroSalvo);
        }catch(error){
            console.error("Erro ao criar livro:", error);
            return res.status(500).json({ message: "Erro interno ao criar livro" });
        }
    }

    static async updateLivro(req, res) {
        try {
            const { id } = req.params;
            const dadosAtualizados = req.body;

            if (dadosAtualizados.categoria) {
                const categoriaExiste = await Categoria.findById(dadosAtualizados.categoria);
                if (!categoriaExiste) {
                    return res.status(404).json({ message: "Categoria não encontrada!" });
                }
            }

            const livroAtualizado = await Livro.update(id, dadosAtualizados);

            if (!livroAtualizado) {
                return res.status(404).json({ message: "Livro não encontrado!" });
            }

            return res.status(200).json(livroAtualizado);
        } catch (error) {
            console.error("Erro ao atualizar livro:", error);
            return res.status(500).json({ message: "Erro interno ao atualizar livro" });
        }
    }

    static async deleteLivro(req, res){
        try{
            const {id} = req.params;
            const livroDeletado = await Livro.delete(id);
            if(!livroDeletado){
                return res.status(404).json({ message: "Livro não encontrado!" });
            }
            return res.status(201).json({message: "Livro removido com sucesso!"});
        }catch(error){
            console.error("Erro ao remover Livro:", error);
            return res.status(500).json({ message: "Erro interno ao remover Livro!." });
        }
    }

    static async getLivrosByCategoria(req, res) {
    try {
        const { categoriaId } = req.params;

        const categoriaExiste = await Categoria.findById(categoriaId);
        if (!categoriaExiste) {
            return res.status(404).json({ message: "Categoria não encontrada!" });
        }

        const livros = await Livro.findByCategoria(categoriaId);
        return res.json(livros);
    } catch (error) {
        console.error("Erro ao buscar livros por categoria:", error);
        return res.status(500).json({ message: "Erro interno ao buscar livros por categoria" });
    }
}

}

export default LivroController;