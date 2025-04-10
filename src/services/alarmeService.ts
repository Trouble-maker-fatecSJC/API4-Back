import { AppDataSource } from "../config/database";
import { Alarme } from "../models/Alarme";
import { Alerta } from "../models/Alertas"; // Importando a entidade Alerta
// import { Medidas } from "../models/medidas"; // Importando a entidade Medidas
// import { Estacao } from "../models/estacao"; // Importando a entidade Estacao
// import { Parametros } from "../models/parametros"; // Importando a entidade Parametros

class AlarmeService {
  // Função para cadastrar um Alarme
  async cadastrar(dados: Alarme) {
    const alarmeRepository = AppDataSource.getRepository(Alarme);

    // Verificar se o Alerta existe antes de associá-lo
    if (dados.alerta && dados.alerta.id_alerta) {
        const alertaRepository = AppDataSource.getRepository(Alerta);
        const alerta = await alertaRepository.findOne({ where: { id_alerta: dados.alerta.id_alerta } });

        if (!alerta) {
            throw new Error("Alerta não encontrado");
        }

        dados.alerta = alerta; // Associando o Alerta existente
    } else {
        throw new Error("ID do alerta é obrigatório");
    }

    // Salvar o Alarme
    return await alarmeRepository.save(dados);
}

  // Função para buscar Alarme por ID
  async buscarPorId(id: number) {
    const alarmeRepository = AppDataSource.getRepository(Alarme);
    return await alarmeRepository.findOne({
      where: { id_alarme: id },
      relations: ["alerta"], // Incluindo a relação com a entidade Alerta
    });
  }

  // Função para buscar todos os Alarmes
  async buscarTodos() {
    const alarmeRepository = AppDataSource.getRepository(Alarme);
    return await alarmeRepository.find({
      relations: ["alerta"], // Incluindo a relação com a entidade Alerta
    });
  }

  // Função para atualizar um Alarme
  async atualizar(id: number, dados: Partial<Alarme>) {
    const alarmeRepository = AppDataSource.getRepository(Alarme);

    // Verificar se o Alerta existe antes de associá-lo
    if (dados.alerta) {
      const alertaRepository = AppDataSource.getRepository(Alerta);
      const alerta = await alertaRepository.findOne({ where: { id_alerta: dados.alerta.id_alerta } });

      if (!alerta) {
        throw new Error("Alerta não encontrado");
      }

      dados.alerta = alerta; // Atualizando o Alerta
    }

    await alarmeRepository.update({ id_alarme: id }, dados);
    return await this.buscarPorId(id);
  }

  // Função para deletar um Alarme
  async deletar(id: number) {
    const alarmeRepository = AppDataSource.getRepository(Alarme);
    await alarmeRepository.delete({ id_alarme: id });
  }

  // Função para verificar detalhes da medida, estação e parâmetro
  async verificarDetalhes(idAlarme: number) {
    const alarmeRepository = AppDataSource.getRepository(Alarme);

    const alarme = await alarmeRepository.findOne({
      where: { id_alarme: idAlarme },
      relations: ["medida", "medida.estacao", "medida.parametro"], // Incluindo as relações necessárias
    });

    if (!alarme) {
      throw new Error("Alarme não encontrado");
    }

    const medida = alarme.medida;
    if (!medida) {
      throw new Error("Medida não encontrada para o alarme");
    }

    const estacao = medida.estacao;
    const parametro = medida.parametro;

    return {
      valorMedida: medida.valor,
      nomeEstacao: estacao ? estacao.nome : "Estação não encontrada",
      nomeParametro: parametro ? parametro.tipoParametro.nome : "Parâmetro não encontrado",
    };
  }
}

export default new AlarmeService();
