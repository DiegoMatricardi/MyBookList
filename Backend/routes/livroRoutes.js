import express from "express";
import LivroController from "../controllers/LivroController.js";

const router = express.Router();

router.get("/livro", LivroController.getAllLivros);
router.get("/livro/:id", LivroController.getById);
router.post("/livro", LivroController.createLivro);
router.put("/livro/:id", LivroController.updateLivro);
router.delete("/livro/:id", LivroController.deleteLivro);
router.get("/livro/categoria/:id", LivroController.getLivrosByCategoria);

export default router;