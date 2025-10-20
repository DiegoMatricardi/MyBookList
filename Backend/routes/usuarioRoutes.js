import express from "express";
import UsuarioController from "../controllers/UsuarioController.js";

const router = express.Router();

router.get("/Usuario", UsuarioController.getAllUsuarios);
router.get("/Usuario/:id", UsuarioController.getById);
router.post("/Usuario", UsuarioController.createUsuario);
router.put("/Usuario/:id", UsuarioController.updateUsuario);
router.delete("/Usuario/:id", UsuarioController.deleteUsuario);

export default router;