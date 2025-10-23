import path from 'path';
import Usuario from "../models/usuario.js";
import __dirname from "../utils/pathUtils.js";

class LoginController{
    static async login(req, res) {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({ message: "Email e senha são obrigatórios!" });
            }

            const usuario = await Usuario.findByEmail(email);
            if (!usuario) {
                return res.status(404).json({ message: "Usuário não encontrado!" });
            }

            if (usuario.senha !== senha) {
                return res.status(401).json({ message: "Senha incorreta!" });
            }

            return res.status(200).json({
                message: "Login realizado com sucesso!",
                usuario
            });

        } catch (error) {
            console.error("Erro no login:", error);
            return res.status(500).json({ message: "Erro interno ao realizar login" });
        }
    }
}

export default LoginController;