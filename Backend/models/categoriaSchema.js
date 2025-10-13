import mongoose from "mongoose";

const CategoriaSchema = new mongoose.Schema(
    {
        nome: { type: String, required: true, trim: true, unique: true }
    },
    {
        timestamps: true
    }
)

const CategoriaModel = mongoose.model('Categoria', CategoriaSchema);
export default CategoriaModel;