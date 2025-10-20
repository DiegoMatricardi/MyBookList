import LivroModel from "./livrosSchema.js";
class Livro{
    constructor({ nome, categoria, descricao = "", notas = [], usuarios = [], capa = "" }) {
        this.nome = nome;
        this.categoria = categoria;
        this.descricao = descricao;
        this.notas = notas;
        this.usuarios = usuarios;
        this.capa = capa;
    }

    async save(){
        const novoLivro = new LivroModel({
            nome: this.nome,
            categoria: this.categoria,
            descricao: this.descricao,
            notas: this.notas,
            usuarios: this.usuarios,
            capa: this.capa
        });
        return await novoLivro.save();
    }

    static async findAll(){
        return await LivroModel.find();
    }

    static async findById(id){
        return await LivroModel.findById(id);
    }

    static async findByCategoria(categoriaId){
        return await LivroModel.find({ categoria: categoriaId }).populate('categoria');
    }

    static async update(id, dados){
        return await LivroModel.findByIdAndUpdate(id, dados, {new: true});
    }

    static async delete(id){
        return await LivroModel.findByIdAndDelete(id);
    }

}

export default Livro;