import { AppDataSource } from "../config/database";
import { TipoParametro } from "../models/tipoParametro";

class tipoParametroService {
  async cadastrar(dados: TipoParametro) {
    const tipo_parametroRepository = AppDataSource.getRepository(TipoParametro);
    return await tipo_parametroRepository.save(dados);
  }

  async buscarPorId(id: number) {
    const tipo_parametroRepository = AppDataSource.getRepository(TipoParametro);
    return await tipo_parametroRepository.findOne({ where: { id_tipo_param: id } });
  }

  async buscarTodas() {
    const tipo_parametroRepository = AppDataSource.getRepository(TipoParametro);
    return await tipo_parametroRepository.find();
  }

  async atualizar(id: number, dados: Partial<TipoParametro>) {
    const tipo_parametroRepository = AppDataSource.getRepository(TipoParametro);
    await tipo_parametroRepository.update({ id_tipo_param: id }, dados);
    return await this.buscarPorId(id);
  }

  async deletar(id: number) {
    const tipo_parametroRepository = AppDataSource.getRepository(TipoParametro);
    await tipo_parametroRepository.delete({ id_tipo_param: id });
  }
}

export default new tipoParametroService();