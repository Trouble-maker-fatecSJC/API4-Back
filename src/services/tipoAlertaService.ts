import { AppDataSource } from "../config/database";
import { TipoAlerta } from "../models/tipoAlerta";
import { Parametros } from "../models/parametros"; // Importando a entidade Parametros

class tipoAlertaService {
  // Função para cadastrar um TipoAlerta
  async cadastrar(dados: TipoAlerta) {
    const tipo_alerta = AppDataSource.getRepository(TipoAlerta);

    // Verificar se o parâmetro existe antes de associá-lo
    if (dados.parametro) {
      const parametroRepository = AppDataSource.getRepository(Parametros);
      const parametro = await parametroRepository.findOne({ where: { id: dados.parametro.id } });

      if (!parametro) {
        throw new Error("Parâmetro não encontrado");
      }

      dados.parametro = parametro; // Associando o parâmetro
    }

    // Salvar o tipo alerta
    return await tipo_alerta.save(dados);
  }

  // Função para buscar TipoAlerta por ID
  async buscarPorId(id: number) {
    const tipo_alerta = AppDataSource.getRepository(TipoAlerta);
    return await tipo_alerta.findOne({
      where: { id_tipo_alerta: id },
      relations: ["parametro"], // Incluindo a relação com a entidade Parametro
    });
  }

  // Função para buscar todos os TipoAlertas
  async buscarTodas() {
    const tipo_alerta = AppDataSource.getRepository(TipoAlerta);
    return await tipo_alerta.find({
      relations: ["parametro"], // Incluindo a relação com a entidade Parametro
    });
  }

  // Função para atualizar um TipoAlerta
  async atualizar(id: number, dados: Partial<TipoAlerta>) {
    const tipo_alerta = AppDataSource.getRepository(TipoAlerta);

    // Verificar se o parâmetro existe antes de associá-lo
    if (dados.parametro) {
      const parametroRepository = AppDataSource.getRepository(Parametros);
      const parametro = await parametroRepository.findOne({ where: { id: dados.parametro.id } });

      if (!parametro) {
        throw new Error("Parâmetro não encontrado");
      }

      dados.parametro = parametro; // Atualizando o parâmetro
    }

    await tipo_alerta.update({ id_tipo_alerta: id }, dados);
    return await this.buscarPorId(id);
  }

  // Função para deletar um TipoAlerta
  async deletar(id: number) {
    const tipo_alerta = AppDataSource.getRepository(TipoAlerta);
    await tipo_alerta.delete({ id_tipo_alerta: id });
  }
}

export default new tipoAlertaService();
