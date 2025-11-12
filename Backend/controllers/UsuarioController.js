import path from "path";
import Usuario from "../models/usuario.js";
import Livro from "../models/livros.js";
import __dirname from "../utils/pathUtils.js";

class UsuarioController {
  static async getAllUsuarios(req, res) {
    try {
      const usuarios = await Usuario.find();
      return res.json(usuarios);
    } catch (error) {
      console.error("Erro ao buscar os usuários:", error);
      res.status(500).json({ message: "Erro interno ao buscar usuários" });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const usuarioExiste = await Usuario.findById(id); 
      if (!usuarioExiste) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }
      res.json(usuarioExiste);
    } catch (error) {
      console.error("Erro ao buscar o usuário:", error);
      res.status(500).json({ message: "Erro interno ao buscar usuário!" });
    }
  }

  static async createUsuario(req, res) {
    try {
      const { nome, cpf, telefone, email, senha, cep, cidade, endereco } = req.body;
      const novoUsuario = new Usuario({
        nome,
        cpf,
        telefone,
        email,
        senha,
        cep,
        cidade,
        endereco,
      });
      const usuarioSalvo = await novoUsuario.save();
      return res.status(201).json(usuarioSalvo);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return res.status(500).json({ message: "Erro interno ao criar usuário" });
    }
  }

  static async updateUsuario(req, res) {
    try {
      const { id } = req.params;
      const dadosAtualizados = req.body;
      const usuarioAtualizado = await Usuario.findByIdAndUpdate(id, dadosAtualizados, {
        new: true,
      }); 
      if (!usuarioAtualizado) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }
      return res.status(200).json(usuarioAtualizado);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return res.status(500).json({ message: "Erro interno ao atualizar usuário." });
    }
  }

  static async deleteUsuario(req, res) {
    try {
      const { id } = req.params;
      const usuarioDeletado = await Usuario.findByIdAndDelete(id);
      if (!usuarioDeletado) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }
      return res.status(200).json({ message: "Usuário removido com sucesso!" });
    } catch (error) {
      console.error("Erro ao remover usuário:", error);
      return res.status(500).json({ message: "Erro interno ao remover usuário." });
    }
  }

  static async avaliarLivro(req, res) {
    try {
      const { usuarioId, livroId } = req.params;
      const { nota } = req.body;

      if (nota < 1 || nota > 5) {
        return res.status(400).json({ message: "A nota deve ser de 1 a 5." });
      }

      const usuario = await Usuario.findById(usuarioId);
      if (!usuario) 
        return res.status(404).json({ message: "Usuário não encontrado!" });

      const livro = await Livro.findById(livroId);
      if (!livro) 
        return res.status(404).json({ message: "Livro não encontrado!" });

      livro.notas.push(nota);
      if (!livro.pessoas.includes(usuarioId)) 
        livro.pessoas.push(usuarioId);
      await livro.save();

      const livroExistente = usuario.livros.find(
        (l) => l.livro.toString() === livroId
      );
      if (livroExistente) {
        livroExistente.nota = nota;
      } else {
        usuario.livros.push({ livro: livroId, nota });
      }

      await usuario.save({ validateBeforeSave: false });
      res.status(200).json({
        message: "Avaliação registrada com sucesso!",
        livro,
        usuario,
      });
    } catch (error) {
      console.error("Erro ao avaliar livro:", error);
      res.status(500).json({ message: "Erro interno ao avaliar livro" });
    }
  }

  static async getLivrosDoUsuario(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findById(id).populate("livros.livro");

      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }

      const livrosAvaliados = usuario.livros
        .filter((l) => l.nota !== undefined && l.livro)
        .map((l) => ({
          _id: l.livro._id,
          nome: l.livro.nome,
          autor: l.livro.autor,
          categoria: l.livro.categoria,
          nota: l.nota,
        }));

      return res.status(200).json(livrosAvaliados);
    } catch (error) {
      console.error("Erro ao buscar livros do usuário:", error);
      res.status(500).json({ message: "Erro interno ao buscar livros avaliados." });
    }
  }
}

export default UsuarioController;
