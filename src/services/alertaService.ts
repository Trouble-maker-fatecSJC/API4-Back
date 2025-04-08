import { AppDataSource } from "../config/database";
import { Alerta } from "../models/Alertas";
import { Parametros } from "../models/parametros"; // Importando a entidade Parametros

class alertaService {
  // Função para cadastrar um Alerta
  async cadastrar(dados: Alerta) {
    const alertaRepository = AppDataSource.getRepository(Alerta);

    // Verificar se o parâmetro existe antes de associá-lo
    if (dados.parametro) {
      const parametroRepository = AppDataSource.getRepository(Parametros);
      const parametro = await parametroRepository.findOne({ where: { id_parametro: dados.parametro.id_parametro } });

      if (!parametro) {
        throw new Error("Parâmetro não encontrado");
      }

      dados.parametro = parametro; // Associando o parâmetro
    }

    // Salvar o alerta
    return await alertaRepository.save(dados);
  }

  // Função para buscar Alerta por ID
  async buscarPorId(id: number) {
    const alertaRepository = AppDataSource.getRepository(Alerta);
    return await alertaRepository.findOne({
      where: { id_alerta: id },
      relations: ["parametro"], // Incluindo a relação com a entidade Parametro
    });
  }

  // Função para buscar todos os Alertas
  async buscarTodas() {
    const alertaRepository = AppDataSource.getRepository(Alerta);
    return await alertaRepository.find({
      relations: ["parametro"], // Incluindo a relação com a entidade Parametro
    });
  }

  // Função para buscar Alerta por título
  async buscarPorTitulo(titulo: string) {
    const alertaRepository = AppDataSource.getRepository(Alerta);
    return await alertaRepository.findOne({
      where: { nome: titulo },
    });
  }

  // Função para atualizar um Alerta
  async atualizar(id: number, dados: Partial<Alerta>) {
    const alertaRepository = AppDataSource.getRepository(Alerta);

    // Verificar se o parâmetro existe antes de associá-lo
    if (dados.parametro) {
      const parametroRepository = AppDataSource.getRepository(Parametros);
      const parametro = await parametroRepository.findOne({ where: { id_parametro: dados.parametro.id_parametro } });

      if (!parametro) {
        throw new Error("Parâmetro não encontrado");
      }

      dados.parametro = parametro; // Atualizando o parâmetro
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

export default new alertaService();
