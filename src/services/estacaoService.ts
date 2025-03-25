import { AppDataSource } from "../config/database"; // Certifique-se de que o caminho está correto
import { Estacao } from "../models/estacao"; // Certifique-se de que o caminho está correto
import { Repository } from "typeorm";

class EstacaoService {
  private estacaoRepository: Repository<Estacao>;

  constructor() {
    this.estacaoRepository = AppDataSource.getRepository(Estacao);
  }

  async cadastrar(dados: Estacao) {
    const estacao = this.estacaoRepository.create(dados);
    return await this.estacaoRepository.save(estacao);
  }

  async deletar(id: number) {
    const estacao = await this.estacaoRepository.findOneBy({ id_estacao: id });
    if (!estacao) {
      throw new Error("Estação não encontrada");
    }
    await this.estacaoRepository.remove(estacao);
  }

  async buscarPorId(id: number) {
    const estacao = await this.estacaoRepository.findOneBy({ id_estacao: id });
    if (!estacao) {
      throw new Error("Estação não encontrada");
    }
    return estacao;
  }

  async buscarTodos() {
    return await this.estacaoRepository.find();
  }

  async buscarPorNome(nome: string) {
    return await this.estacaoRepository.find({
      where: { nome },
    });
  }

  async atualizar(id: number, dados: Partial<Estacao>) {
    const estacao = await this.estacaoRepository.findOneBy({ id_estacao: id });
    if (!estacao) {
      throw new Error("Estação não encontrada");
    }
    this.estacaoRepository.merge(estacao, dados);
    return await this.estacaoRepository.save(estacao);
  }
}

export default new EstacaoService();