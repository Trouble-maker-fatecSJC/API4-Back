import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Definindo o tipo para os dados da Estação
interface Estacao {
  UID?: string;
  Nome: string;
  Latitude: number;
  Longitude: number;
  Data_Instalacao: Date;
  Tipo_Estacao: string;
  Indicativo_Ativa: boolean;
}

// Buscar todas as estações
export const getEstacoes = async (req: any, res: any) => {
  try {
    const estacoes = await prisma.estacao.findMany();
    res.json(estacoes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar as estações' });
  }
};

// Buscar uma estação pelo id
export const getEstacaoById = async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const estacao = await prisma.estacao.findUnique({
      where: {
        ID_Estacao: parseInt(id),
      },
    });

    if (!estacao) {
      return res.status(404).json({ error: 'Estação não encontrada' });
    }

    res.json(estacao);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar a estação' });
  }
};

// Criar uma nova estação
export const criarEstacao = async (req: any, res: any) => {
  const { Nome, Latitude, Longitude, Data_Instalacao, Tipo_Estacao, Indicativo_Ativa }: Estacao = req.body;

  try {
    const estacao = await prisma.estacao.create({
      data: {
        Nome,
        Latitude,
        Longitude,
        Data_Instalacao,
        Tipo_Estacao,
        Indicativo_Ativa,
      },
    });
    res.status(201).json(estacao);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar a estação' });
  }
};

// Atualizar uma estação existente
export const atualizarEstacao = async (req: any, res: any) => {
  const { id } = req.params;
  const { Nome, Latitude, Longitude, Data_Instalacao, Tipo_Estacao, Indicativo_Ativa }: Estacao = req.body;

  try {
    const estacao = await prisma.estacao.update({
      where: {
        ID_Estacao: parseInt(id),
      },
      data: {
        Nome,
        Latitude,
        Longitude,
        Data_Instalacao,
        Tipo_Estacao,
        Indicativo_Ativa,
      },
    });

    if (!estacao) {
      return res.status(404).json({ error: 'Estação não encontrada' });
    }

    res.json(estacao);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar a estação' });
  }
};

// Deletar uma estação
export const deletarEstacao = async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const estacao = await prisma.estacao.delete({
      where: {
        ID_Estacao: parseInt(id),
      },
    });

    if (!estacao) {
      return res.status(404).json({ error: 'Estação não encontrada' });
    }

    res.json({ message: 'Estação deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar a estação' });
  }
};
