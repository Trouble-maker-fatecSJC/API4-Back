import { AppDataSource } from "../config/database";
import { Alerta } from "../models/alerta";
import { TipoAlerta } from "../models/tipoAlerta"; // Importando a entidade TipoAlerta

class AlertaService {
  // Função para cadastrar um Alerta
  async cadastrar(dados: Alerta) {
    const alertaRepository = AppDataSource.getRepository(Alerta);

    // Verificar se o TipoAlerta existe antes de associá-lo
    if (dados.tipoAlerta) {
      const tipoAlertaRepository = AppDataSource.getRepository(TipoAlerta);
      const tipoAlerta = await tipoAlertaRepository.findOne({ where: { id_tipo_alerta: dados.tipoAlerta.id_tipo_alerta } });

      if (!tipoAlerta) {
        throw new Error("TipoAlerta não encontrado");
      }

      dados.tipoAlerta = tipoAlerta; // Associando o TipoAlerta
    }

    // Salvar o Alerta
    return await alertaRepository.save(dados);
  }

  // Função para buscar Alerta por ID
  async buscarPorId(id: number) {
    const alertaRepository = AppDataSource.getRepository(Alerta);
    return await alertaRepository.findOne({
      where: { id_alerta: id },
      relations: ["tipoAlerta"], // Incluindo a relação com a entidade TipoAlerta
    });
  }

  // Função para buscar todos os Alertas
  async buscarTodos() {
    const alertaRepository = AppDataSource.getRepository(Alerta);
    return await alertaRepository.find({
      relations: ["tipoAlerta"], // Incluindo a relação com a entidade TipoAlerta
    });
  }

  // Função para atualizar um Alerta
  async atualizar(id: number, dados: Partial<Alerta>) {
    const alertaRepository = AppDataSource.getRepository(Alerta);

    // Verificar se o TipoAlerta existe antes de associá-lo
    if (dados.tipoAlerta) {
      const tipoAlertaRepository = AppDataSource.getRepository(TipoAlerta);
      const tipoAlerta = await tipoAlertaRepository.findOne({ where: { id_tipo_alerta: dados.tipoAlerta.id_tipo_alerta } });

      if (!tipoAlerta) {
        throw new Error("TipoAlerta não encontrado");
      }

      dados.tipoAlerta = tipoAlerta; // Atualizando o TipoAlerta
    }

    await alertaRepository.update({ id_alerta: id }, dados);
    return await this.buscarPorId(id);
  }

  // Função para deletar um Alerta
  async deletar(id: number) {
    const alertaRepository = AppDataSource.getRepository(Alerta);
    await alertaRepository.delete({ id_alerta: id });
  }
}

export default new AlertaService();
