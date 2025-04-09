import { AppDataSource } from "../config/database";
import { Medidas } from "../models/medidas";
import { Repository } from "typeorm";
import { Estacao } from "../models/estacao";
import { Parametros } from "../models/parametros";
class MedidasService {
  private medidasRepository: Repository<Medidas>;

  constructor() {
    this.medidasRepository = AppDataSource.getRepository(Medidas);
  }

  async cadastrar(dados: { valor: number; unix_time: string; id_estacao: number; id_parametro: number }) {
    const estacaoRepository = AppDataSource.getRepository(Estacao);
    const parametrosRepository = AppDataSource.getRepository(Parametros);

    // Buscar a estação e o parâmetro pelos IDs fornecidos
    const estacao = await estacaoRepository.findOneBy({ id_estacao: dados.id_estacao });
    const parametro = await parametrosRepository.findOneBy({ id_parametro: dados.id_parametro });

    if (!estacao) {
        throw new Error("Estação não encontrada");
    }
    if (!parametro) {
        throw new Error("Parâmetro não encontrado");
    }

    // Criar a medida com os relacionamentos
    const medida = this.medidasRepository.create({
        valor: dados.valor,
        unix_time: new Date(dados.unix_time), // Converte unix_time para Date
        estacao: estacao, // Relaciona com a estação encontrada
        parametro: parametro, // Relaciona com o parâmetro encontrado
    });

    return await this.medidasRepository.save(medida);
}

  async buscarPorId(id: number) {
    const medida = await this.medidasRepository.findOne({
      where: { id_medida: id },
      relations: ["estacao", "parametro"], // Inclui as relações
    });
    if (!medida) {
      throw new Error("Medida não encontrada");
    }
    return medida;
  }

  async buscarTodos() {
    return await this.medidasRepository.find({
      relations: ["estacao", "parametro"], // Inclui as relações
    });
  }

  async deletar(id: number) {
    const medida = await this.medidasRepository.findOneBy({ id_medida: id });
    if (!medida) {
      throw new Error("Medida não encontrada");
    }
    await this.medidasRepository.remove(medida);
  }

  async atualizar(id: number, dados: Partial<Medidas>) {
    const medida = await this.medidasRepository.findOneBy({ id_medida: id });
    if (!medida) {
      throw new Error("Medida não encontrada");
    }
    if (dados.unix_time) {
      dados.unix_time = new Date(dados.unix_time); // Ensure unix_time is a Date
    }
    this.medidasRepository.merge(medida, dados);
    return await this.medidasRepository.save(medida);
  }
}

export default new MedidasService();
