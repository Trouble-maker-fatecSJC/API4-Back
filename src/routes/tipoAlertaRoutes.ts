import { Router } from "express";
import tipoAlertaController from "../controller/tipoAlertaController";

const router = Router();

router.get("/tipoalerta/:id", (req, res) => { tipoAlertaController.buscarPorId(req, res) });
router.get("/tipoalerta", (req, res) => { tipoAlertaController.buscarTodas(req, res) });
router.post("/tipoalerta", (req, res) => { tipoAlertaController.cadastrar(req, res) });
router.put("/tipoalerta/:id", (req, res) => { tipoAlertaController.atualizar(req, res) });
router.delete("/tipoalerta/:id", (req, res) => { tipoAlertaController.deletar(req, res) });

export default router;