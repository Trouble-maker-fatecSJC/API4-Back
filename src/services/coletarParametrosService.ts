import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { ColetarParametros } from "../models/coletarParametros";
import { Estacao } from "../models/estacao";
import { Parametros } from "../models/parametros";
import { Medidas } from "../models/medidas";

class ColetarParametrosService {
  private coletarParametrosRepository: Repository<ColetarParametros>;

  constructor() {
    this.coletarParametrosRepository = AppDataSource.getRepository(ColetarParametros);
  }

  // Cadastrar um novo ColetarParametros
  async cadastrar(dados: Partial<ColetarParametros>) {
    // Verificar se os IDs de estação, parâmetro e medida foram passados corretamente
    const estacaoId = typeof dados.estacao === 'object' ? dados.estacao.id_estacao : dados.estacao;
    const parametroId = typeof dados.parametro === 'object' ? dados.parametro.id_parametro : dados.parametro;
    const medidaId = typeof dados.medida === 'object' ? dados.medida.id_medida : dados.medida;

    // Buscar a estação, o parâmetro e a medida no banco de dados
    const estacao = await AppDataSource.getRepository(Estacao).findOneBy({ id_estacao: estacaoId });
    const parametro = await AppDataSource.getRepository(Parametros).findOneBy({ id_parametro: parametroId });
    const medida = await AppDataSource.getRepository(Medidas).findOneBy({ id_medida: medidaId });

    if (!estacao) {
      throw new Error("Estação não encontrada");
    }
    if (!parametro) {
      throw new Error("Parâmetro não encontrado");
    }
    if (!medida) {
      throw new Error("Medida não encontrada");
    }

    // Criando a nova coleta de parâmetros
    const coleta = this.coletarParametrosRepository.create({
      ...dados,
      estacao,
      parametro,
      medida, // Associação correta do objeto Medidas
    });

    // Salvar no banco de dados
    return await this.coletarParametrosRepository.save(coleta);
  }

  // Buscar todas as coletas de parâmetros
  async buscarTodos() {
    return await this.coletarParametrosRepository.find({
      relations: [
        "estacao", // Carrega os dados da estação associada
        "parametro", // Carrega os dados do parâmetro associado
        "medida" // Carrega os dados da medida associada
      ],
    });
  }

  // Buscar ColetarParametros por ID
  async buscarPorId(id: number) {
    const coleta = await this.coletarParametrosRepository.findOneBy({ id });

    if (!coleta) {
      throw new Error("Coleta de parâmetros não encontrada");
    }

    return coleta;
  }

  // Atualizar ColetarParametros por ID
  async atualizar(id: number, dados: Partial<ColetarParametros>) {
    const coleta = await this.coletarParametrosRepository.findOneBy({ id });

    if (!coleta) {
      throw new Error("Coleta de parâmetros não encontrada");
    }

    this.coletarParametrosRepository.merge(coleta, dados);
    return await this.coletarParametrosRepository.save(coleta);
  }

  // Deletar um ColetarParametros por ID
  async deletar(id: number) {
    const coleta = await this.coletarParametrosRepository.findOneBy({ id });

    if (!coleta) {
      throw new Error("Coleta de parâmetros não encontrada");
    }

    await this.coletarParametrosRepository.remove(coleta);
  }

  // Buscar ColetarParametros por ID da Estação
  async buscarPorIdEstacao(id_estacao: number) {
    // Busca todos os registros de ColetarParametros associados à estação com o ID fornecido
    const coletas = await this.coletarParametrosRepository.find({
      where: { estacao: { id_estacao } }, // Filtra pelo relacionamento com Estacao
      relations: ["estacao", "parametro"], // Carrega as relações (opcional)
    });

    if (!coletas || coletas.length === 0) {
      throw new Error("Nenhuma coleta encontrada para esta estação.");
    }

    return coletas;
  }
}

export default new ColetarParametrosService();
