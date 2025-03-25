import { AppDataSource } from "../config/database";
import { Parametros } from "../models/parametros";

class ParametroService {
  async cadastrar(dados: Parametros) {
    const parametroRepository = AppDataSource.getRepository(Parametros);
    return await parametroRepository.save(dados);
  }

  async buscarPorId(id: number) {
    const parametroRepository = AppDataSource.getRepository(Parametros);
    return await parametroRepository.findOne({
      where: { id },
      relations: ["usuario", "tipoParametro", "estacao", "medida"],
    });
  }

  async buscarTodos() {
    const parametroRepository = AppDataSource.getRepository(Parametros);
    return await parametroRepository.find({
      relations: ["usuario", "tipoParametro", "estacao", "medida"],
    });
  }

  async atualizar(id: number, dados: Partial<Parametros>) {
    const parametroRepository = AppDataSource.getRepository(Parametros);
    await parametroRepository.update({ id }, dados);
    return await this.buscarPorId(id);
  }

  async deletar(id: number) {
    const parametroRepository = AppDataSource.getRepository(Parametros);
    await parametroRepository.delete({ id });
  }
}

export default new ParametroService();
