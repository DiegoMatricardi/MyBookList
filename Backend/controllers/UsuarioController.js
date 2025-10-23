import path from "path";
import Usuario from "../models/usuario.js";
import Livro from "../models/livros.js";
import __dirname from "../utils/pathUtils.js";

class UsuarioController{
    static async getAllUsuarios(req, res){
        try{
            const usuarios = await Usuario.findAll();
            return res.json(usuarios);
        }catch(error){
            console.error('Erro ao buscar os usuarios: ',error);
            res.status(500).json({message: 'Erro interno ao buscar usuarios'})
        }
    }

    static async getById(req, res){
        try{
            const {id} = req.params;
            const usuarioExiste = Usuario.findById(id);
            if(!usuarioExiste){
                return res.status(404).json({message: 'Usuario não encontrado!'});
            }
            res.json(usuarioExiste);
        }catch(error){
            console.error('Erro ao busca o usuario: ',error);
            res.status(500).json({message: 'Erro interno ao buscar usuario!'})
        }
    }

    static async createUsuario(req, res){
        try{
            const {nome, cpf, telefone, email, senha} = req.body;
            const novoUsuario = new Usuario({
                nome,
                cpf,
                telefone,
                email,
                senha
            });
            const usuarioSalvo = await novoUsuario.save();
            return res.status(201).json(usuarioSalvo);
        }catch(error){
            console.error("Erro ao criar usuário:", error);
            return res.status(500).json({ message: "Erro interno ao criar usuário" });
        }
    }

    static async updateUsuario(req, res){
        try{
            const {id} = req.params;
            const dadosAtualizados = req.body;
            const usuarioAtualizado = await Usuario.update(id, dadosAtualizados);
            if(!usuarioAtualizado){
                return res.status(404).json({message: 'Usuario não encontrado!'});
            }
            return res.status(200).json(usuarioAtualizado);
        }catch(error){
            console.error("Erro ao atualizar usuário:", error);
            return res.status(500).json({ message: "Erro interno ao atualizar usuário." });
        }
    }

    static async deleteUsuario(req, res){
        try{
            const {id} = req.params;
            const usuarioDeletado = await Usuario.delete(id);
            if(!usuarioDeletado){
                return res.status(404).json({ message: "Usuário não encontrado!" });
            }
            return res.status(201).json({message: "Usuário removido com sucesso!"});
        }catch(error){
            console.error("Erro ao remover usuário:", error);
            return res.status(500).json({ message: "Erro interno ao remover usuário." });
        }
    }

    static async avaliarLivro(req, res) {
        try {
            const { usuarioId, livroId } = req.params;
            const { nota } = req.body;

            const usuario = await Usuario.findById(usuarioId);
            if (!usuario) return res.status(404).json({ message: "Usuário não encontrado!" });

            const livro = await Livro.findById(livroId);
            if (!livro) return res.status(404).json({ message: "Livro não encontrado!" });

            // Adiciona nota e id do usuário no livro
            livro.notas.push(nota);
            if (!livro.pessoas.includes(usuarioId)) livro.pessoas.push(usuarioId);
            await livro.save();

            // Adiciona livro ao histórico do usuário com a nota
            const livroExistente = usuario.livros.find(l => l.livro.toString() === livroId);
            if (!livroExistente) {
                usuario.livros.push({ livro: livroId, nota }); // aqui é o objeto completo
            } else {
                // Atualiza nota se o livro já existir
                livroExistente.nota = nota;
            }

            await usuario.save();

            res.status(200).json({
                message: "Avaliação registrada com sucesso!",
                livro,
                usuario
            });

        } catch (error) {
            console.error("Erro ao avaliar livro:", error);
            res.status(500).json({ message: "Erro interno ao avaliar livro" });
        }
    }

}

export default UsuarioController;