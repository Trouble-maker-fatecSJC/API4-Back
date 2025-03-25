import { AppDataSource } from "../config/database";
import { TipoAlerta } from "../models/tipoAlerta";

class tipoAlertaService {
  async cadastrar(dados: TipoAlerta) {
    const tipo_alerta = AppDataSource.getRepository(TipoAlerta);
    return await tipo_alerta.save(dados);
  }

  async buscarPorId(id: number) {
    const tipo_alerta = AppDataSource.getRepository(TipoAlerta);
    return await tipo_alerta.findOne({ where: { id_tipo_alerta: id } });
  }

  async buscarTodas() {
    const tipo_alerta = AppDataSource.getRepository(TipoAlerta);
    return await tipo_alerta.find();
  }

  async atualizar(id: number, dados: Partial<TipoAlerta>) {
    const tipo_alerta = AppDataSource.getRepository(TipoAlerta);
    await tipo_alerta.update({ id_tipo_alerta: id }, dados);
    return await this.buscarPorId(id);
  }

  async deletar(id: number) {
    const tipo_alerta = AppDataSource.getRepository(TipoAlerta);
    await tipo_alerta.delete({ id_tipo_alerta: id });
  }
}

export default new tipoAlertaService();