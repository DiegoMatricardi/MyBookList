import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema(
    {
        nome: { type: String, required: true, trim: true },
        cpf: { type: String, required: true, unique: true, trim: true },
        telefone: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        senha: { type: String, required: true },
        cep: { type: String, required: true, trim: true },
        cidade: { type: String, required: true, trim: true },
        endereco: { type: String, required: true, trim: true },
        livros: [
            {
                livro: { type: mongoose.Schema.Types.ObjectId, ref: "Livro", required: true },
                nota: { type: Number, min: 0, max: 5 }
            }
        ]
    },
    {
        timestamps: true
    }
)

const UsuarioModel = mongoose.model('Usuario', UsuarioSchema);
export default UsuarioModel;