import { Router } from "express";
import tipoParametroController from "../controller/tipoParametroController";

const router = Router();

router.get("/tipoparametro/:id", (req, res) => { tipoParametroController.buscarPorId(req, res) });
router.get("/tipoparametro", (req, res) => { tipoParametroController.buscarTodas(req, res) });
router.post("/tipoparametro", (req, res) => { tipoParametroController.cadastrar(req, res) });
router.put("/tipoparametro/:id", (req, res) => { tipoParametroController.atualizar(req, res) });
router.delete("/tipoparametro/:id", (req, res) => { tipoParametroController.deletar(req, res) });

export default router;