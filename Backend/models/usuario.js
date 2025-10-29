import UsuarioModel from "./usuarioSchema.js";

class Usuario{
    constructor({ nome, cpf, telefone, email, senha, livros = [],cep,cidade,endereco }) {
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
        this.email = email;
        this.senha = senha;
        this.livros = livros; 
        this.cep = cep;
        this.cidade = cidade;
        this.endereco = endereco;
    }

    async save(){
        const novoUsuario = new UsuarioModel({
            nome: this.nome,
            cpf: this.cpf,
            telefone: this.telefone,
            email: this.email,
            senha: this.senha,
            livros: this.livros,
            cep: this.cep,
            cidade: this.cidade,
            endereco: this.endereco
        });
        return await novoUsuario.save();
    }

    static async findAll(){
        return await UsuarioModel.find();
    }

    static async findById(id){
        return await UsuarioModel.findById(id);
    }

    static async findByEmail(email) {
        return await UsuarioModel.findOne({ email });
    }

    static async update(id, dados){
        return await UsuarioModel.findByIdAndUpdate(id, dados, {new: true});
    }

    static async delete(id){
        return await UsuarioModel.findByIdAndDelete(id);
    }
}

export default Usuario;