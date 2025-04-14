import { Router } from "express";
import ColetarParametrosController from "../controller/coletaParametrosController";  // Certifique-se de que o caminho está correto

const router = Router();

// Rota para cadastrar uma nova coleta de parâmetros
router.post("/coletar-parametros", (req, res) => { 
  ColetarParametrosController.cadastrar(req, res);
});

// Rota para buscar todos os coletar parâmetros
router.get("/coletar-parametros", (req, res) => { 
  ColetarParametrosController.buscarTodos(req, res);
});

// Rota para buscar uma coleta de parâmetros por ID
// router.get("/coletar-parametros/:id", (req, res) => { 
//   ColetarParametrosController.buscarPorId(req, res);
// });

// Rota para buscar uma coleta de parâmetros por ID
router.get("/coletar-parametros/:id", (req, res) => { 
  ColetarParametrosController.buscarEstacaoId (req, res);
});

// Rota para atualizar uma coleta de parâmetros por ID
router.put("/coletar-parametros/:id", (req, res) => { 
  ColetarParametrosController.atualizar(req, res);
});

// Rota para deletar uma coleta de parâmetros por ID
// router.delete("/coletar-parametros/:id", (req, res) => { 
//   ColetarParametrosController.deletar(req, res);
// });

export default router;
