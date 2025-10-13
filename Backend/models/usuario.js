import UsuarioModel from "./usuarioSchema.js";

class Usuario{
    constructor({ nome, cpf, telefone, email, senha, livros = [] }) {
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
        this.email = email;
        this.senha = senha;
        this.livros = livros; 
    }

    async save(){
        const novoUsuario = new UsuarioModel({
            nome: this.nome,
            cpf: this.cpf,
            telefone: this.telefone,
            email: this.email,
            senha: this.senha,
            livros: this.livros
        });
        return await novoUsuario.save();
    }

    static async findAll(){
        return await UsuarioModel.find();
    }

    static async findById(id){
        return await UsuarioModel.findById(id);
    }

    static async update(id, dados){
        return await UsuarioModel.findByIdAndUpdate(id, dados, {new: true});
    }

    static async delete(id){
        return await UsuarioModel.findByIdAndDelete(id);
    }
}

export default Usuario;