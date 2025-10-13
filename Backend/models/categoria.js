import CategoriaModel from "./categoriaSchema.js";

class Categoria{
    constructor(nome){
        this.nome = nome;
    }

    async save(){
        const novaCategoria = new CategoriaModel({
            nome: this.nome
        });
        return await novaCategoria.save();
    }

    static async findAll(){
        return await CategoriaModel.find();
    }

    static async findById(id){
        return await CategoriaModel.findById(id);
    }

    static async update(id, dados){
        return await CategoriaModel.findByIdAndUpdate(id, dados, {new: true});
    }

    static async delete(id){
        return await CategoriaModel.findByIdAndDelete(id);
    }
}
export default Categoria;