import express from "express";
import CategoriaController from "../controllers/CategoriaController.js";

const router = express.Router();

router.get("/categoria", CategoriaController.getAllCategorias);
router.get("/categoria/:id", CategoriaController.getById);
router.post("/categoria", CategoriaController.createCategoria);
router.put("/categoria/:id", CategoriaController.updateCategoria);
router.delete("/categoria/:id", CategoriaController.deleteCategoria);

export default router;