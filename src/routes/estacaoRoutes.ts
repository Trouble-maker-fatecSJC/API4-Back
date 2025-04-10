import { Router } from "express";
import EstacaoController from "../controller/estacaoController";

const router = Router();


router.post("/estacao", (req, res) => { EstacaoController.cadastrar(req, res)});
router.get("/estacoes", (req, res) => { EstacaoController.buscarTodos(req, res)});
router.get("/estacoes/:id", (req, res) => { EstacaoController.buscarPorId(req, res)});
router.get("/estacao/:uid", (req, res) => { EstacaoController.buscarPorUid(req, res)});
router.delete("/estacoes/:id", (req, res) => { EstacaoController.deletar(req, res)});
router.get("/estacoes/:nome", (req, res) => { EstacaoController.buscarPorNome(req, res)});
router.put("/estacao/:id", (req, res) => { EstacaoController.atualizar(req, res)});


export default router;
