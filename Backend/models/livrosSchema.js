import mongoose from "mongoose";

const LivroSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, trim: true },
    categoria: { type: mongoose.Schema.Types.ObjectId, ref: "Categoria", required: true },
    descricao: { type: String, trim: true },
    notas: [{ type: Number, min: 0, max: 5 }],
    pessoas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }],
    capa: { type: String, trim: true } 
  },
  {
    timestamps: true
  }
);

const LivroModel = mongoose.model('Livro', LivroSchema);
export default LivroModel;