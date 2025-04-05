import { Router } from "express";
import parametroController from "../controller/parametroController";

const router = Router();

router.get("/parametro/:id", (req, res) => { parametroController.buscarPorId(req, res) });
router.get("/parametro", (req, res) => { parametroController.buscarTodos(req, res) });
// router.post("/parametro", (req, res) => { parametroController.cadastrar(req, res) });
// router.put("/parametro/:id", (req, res) => { parametroController.atualizar(req, res) });
// router.delete("/parametro/:id", (req, res) => { parametroController.deletar(req, res) });

export default router;