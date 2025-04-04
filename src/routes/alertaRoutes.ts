import { Router } from "express";
import alertaController from "../controller/alertaController";

const router = Router();

router.get("/alerta/:id", (req, res) => { alertaController.buscarPorId(req, res) });
router.get("/alerta", (req, res) => { alertaController.buscarTodas(req, res) });
router.post("/alerta", (req, res) => { alertaController.cadastrar(req, res) });
router.put("/alerta/:id", (req, res) => { alertaController.atualizar(req, res) });
router.delete("/alerta/:id", (req, res) => { alertaController.deletar(req, res) });

export default router;