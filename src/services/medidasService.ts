import { AppDataSource } from "../config/database";
import { Medidas } from "../models/medidas";

class MedidasService {
  async cadastrar(dados: Medidas) {
    const medidasRepository = AppDataSource.getRepository(Medidas);
    return await medidasRepository.save(dados);
  }

  async buscarPorId(id: number) {
    const medidasRepository = AppDataSource.getRepository(Medidas);
    return await medidasRepository.findOne({ where: { id_medida: id } });
  }

  async buscarTodas() {
    const medidasRepository = AppDataSource.getRepository(Medidas);
    return await medidasRepository.find();
  }

  async atualizar(id: number, dados: Partial<Medidas>) {
    const medidasRepository = AppDataSource.getRepository(Medidas);
    await medidasRepository.update({ id_medida: id }, dados);
    return await this.buscarPorId(id);
  }

  async deletar(id: number) {
    const medidasRepository = AppDataSource.getRepository(Medidas);
    await medidasRepository.delete({ id_medida: id });
  }
}

export default new MedidasService();
