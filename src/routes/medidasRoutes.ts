import { Router } from "express";
import MedidasController from "../controller/medidasController";

const router = Router();

router.get("/medidas/:id", (req, res) => { MedidasController.buscarPorId(req, res) });
router.get("/medidas", (req, res) => { MedidasController.buscarTodos(req, res) });
router.post("/medidas", (req, res) => { MedidasController.cadastrar(req, res) });
router.put("/medidas/:id", (req, res) => { MedidasController.atualizar(req, res) });
router.delete("/medidas/:id", (req, res) => { MedidasController.deletar(req, res) });

export default router;