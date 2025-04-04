import { Router } from "express";
import alarmeController from "../controller/alarmeController";

const router = Router();

router.get("/alarme/:id", (req, res) => { alarmeController.buscarPorId(req, res) });
router.get("/alarme", (req, res) => { alarmeController.buscarTodos(req, res) });
router.post("/alarme", (req, res) => { alarmeController.cadastrar(req, res) });
router.put("/alarme/:id", (req, res) => { alarmeController.atualizar(req, res) });
router.delete("/alarme/:id", (req, res) => { alarmeController.deletar(req, res) });

export default router;