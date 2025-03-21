import { Router } from 'express';
import {
  getEstacoes,
  getEstacaoById,
  criarEstacao,
  atualizarEstacao,
  deletarEstacao,
} from '../controllers/estacao.js';

const router = Router();

// Rota GET - Buscar todas as estações
router.get('/', getEstacoes);

// Rota GET - Buscar uma estação pelo id
router.get('/:id', getEstacaoById);

// Rota POST - Criar uma nova estação
router.post('/cadastrar-estacao', criarEstacao);

// Rota PUT - Atualizar uma estação existente
router.put('/:id', atualizarEstacao);

// Rota DELETE - Deletar uma estação
router.delete('/:id', deletarEstacao);

export default router;
