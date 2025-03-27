import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { ColetarParametros } from "../models/coletarParametros";
import { Estacao } from "../models/estacao";
import { Parametros } from "../models/parametros";

class ColetarParametrosService {
  private coletarParametrosRepository: Repository<ColetarParametros>;

  constructor() {
    this.coletarParametrosRepository = AppDataSource.getRepository(ColetarParametros);
  }

  // Cadastrar um novo ColetarParametros
  async cadastrar(dados: Partial<ColetarParametros>) {
    // Verificar se os IDs de estação e parâmetro foram passados corretamente
    const estacaoId = typeof dados.estacao === 'object' ? dados.estacao.id_estacao : dados.estacao;
    const parametroId = typeof dados.parametro === 'object' ? dados.parametro.id_parametro : dados.parametro;

    // Buscar a estação e o parâmetro no banco de dados
    const estacao = await AppDataSource.getRepository(Estacao).findOneBy({ id_estacao: estacaoId });
    const parametro = await AppDataSource.getRepository(Parametros).findOneBy({ id_parametro: parametroId });

    if (!estacao) {
      throw new Error("Estação não encontrada");
    }
    if (!parametro) {
      throw new Error("Parâmetro não encontrado");
    }

    // Criando a nova coleta de parâmetros
    const coleta = this.coletarParametrosRepository.create({
      ...dados,
      estacao,
      parametro,
    });

    // Salvar no banco de dados
    return await this.coletarParametrosRepository.save(coleta);
  }

  // Buscar todas as coletas de parâmetros
  async buscarTodos() {
    return await this.coletarParametrosRepository.find({
      relations: [
        "estacao",
        "parametro",
        "parametro.usuario", // Carrega os dados do usuário associado ao parâmetro
        "parametro.tipoParametro", // Carrega o tipo do parâmetro
        "parametro.medida" // Carrega a medida do parâmetro
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
}

export default new ColetarParametrosService();
