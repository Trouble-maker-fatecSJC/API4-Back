import { Router } from "express";
import UsuarioController from "../controller/usuarioController";

const router = Router();

router.get("/usuarios/:cpf", (req, res) => { UsuarioController.buscarPorCpf(req, res)});
router.get("/usuarios", (req, res) => { UsuarioController.buscarTodos(req, res)});
router.post("/usuarios", (req, res) => { UsuarioController.cadastrar(req, res)});
router.put("/usuarios/:cpf", (req, res) => { UsuarioController.atualizar(req, res)});
router.delete("/usuarios/:cpf", (req, res) => { UsuarioController.deletar(req, res)});
router.post("/login", (req, res) => { UsuarioController.login(req, res)});
export default router;

