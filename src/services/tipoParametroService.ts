import { AppDataSource } from "../config/database";
import { TipoParametro } from "../models/tipoParametro";
import { Parametros } from "../models/parametros";
class tipoParametroService {
  async cadastrar(dados: TipoParametro) {
    const tipo_parametroRepository = AppDataSource.getRepository(TipoParametro);
    const parametroRepository = AppDataSource.getRepository(Parametros);

    const tipoParametro = await tipo_parametroRepository.save(dados);

    const parametro = parametroRepository.create({
      tipoParametro: tipoParametro
    });
    await parametroRepository.save(parametro);
    
    return tipoParametro;

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
    const parametroRepository = AppDataSource.getRepository(Parametros);

  const tipoParametro = await tipo_parametroRepository.findOne({ where: { id_tipo_param: id } });
  if (!tipoParametro) {
    throw new Error("Tipo de parâmetro não encontrado");
  }

  // Atualizar o tipoParametro
  await tipo_parametroRepository.update({ id_tipo_param: id }, dados);

  // Atualizar os parâmetros relacionados
  const parametrosRelacionados = await parametroRepository.find({
    where: { tipoParametro: { id_tipo_param: id } },
  });

  for (const parametro of parametrosRelacionados) {
    parametro.tipoParametro = { ...tipoParametro, ...dados };
    await parametroRepository.save(parametro);
  }

  return await this.buscarPorId(id);
  }

  async deletar(id: number) {
    const tipo_parametroRepository = AppDataSource.getRepository(TipoParametro);
    // const parametroRepository = AppDataSource.getRepository(Parametros);

    // const tipoParametro = await tipo_parametroRepository.findOne({ where: { id_tipo_param: id } });
    // if (!tipoParametro) {
    //   throw new Error("Tipo de parâmetro não encontrado");
    // }
    // await parametroRepository.delete({ tipoParametro: { id_tipo_param: id } });

    await tipo_parametroRepository.delete({ id_tipo_param: id });
  }
}

export default new tipoParametroService();