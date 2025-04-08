import { AppDataSource } from "../config/database";
import { Alarme } from "../models/Alarme";
import { Alerta } from "../models/Alertas"; // Importando a entidade Alerta
import { Medidas } from "../models/medidas"; // Importando a entidade Medidas
import { Parametros } from "../models/parametros"; // Importando a entidade Parametros

class AlarmeService {
  // Função para cadastrar um Alarme
  async cadastrar(dados: Alarme) {
    const alarmeRepository = AppDataSource.getRepository(Alarme);

    // Verificar se o Alerta existe antes de associá-lo
    if (dados.alerta && dados.alerta.id_alerta) {
        const alertaRepository = AppDataSource.getRepository(Alerta);
        const alerta = await alertaRepository.findOne({ where: { id_alerta: dados.alerta.id_alerta } });

        if (!alerta) {
            throw new Error("Alerta não encontrado");
        }

        dados.alerta = alerta; // Associando o Alerta existente
    } else {
        throw new Error("ID do alerta é obrigatório");
    }

    // Salvar o Alarme
    return await alarmeRepository.save(dados);
  }

  // Função para buscar Alarme por ID
  async buscarPorId(id: number) {
    const alarmeRepository = AppDataSource.getRepository(Alarme);
    return await alarmeRepository.findOne({
      where: { id_alarme: id },
      relations: ["alerta"], // Incluindo a relação com a entidade Alerta
    });
  }

  // Função para buscar todos os Alarmes
  async buscarTodos() {
    const alarmeRepository = AppDataSource.getRepository(Alarme);
    return await alarmeRepository.find({
      relations: ["alerta"], // Incluindo a relação com a entidade Alerta
    });
  }

  // Função para atualizar um Alarme
  async atualizar(id: number, dados: Partial<Alarme>) {
    const alarmeRepository = AppDataSource.getRepository(Alarme);

    // Verificar se o Alerta existe antes de associá-lo
    if (dados.alerta) {
      const alertaRepository = AppDataSource.getRepository(Alerta);
      const alerta = await alertaRepository.findOne({ where: { id_alerta: dados.alerta.id_alerta } });

      if (!alerta) {
        throw new Error("Alerta não encontrado");
      }

      dados.alerta = alerta; // Atualizando o Alerta
    }

    await alarmeRepository.update({ id_alarme: id }, dados);
    return await this.buscarPorId(id);
  }

  // Função para deletar um Alarme
  async deletar(id: number) {
    const alarmeRepository = AppDataSource.getRepository(Alarme);
    await alarmeRepository.delete({ id_alarme: id });
  }

  // Função para cadastrar e emitir um Alarme
  async cadastrarEmitirAlarme(id_alerta: number, id_medida: number) {
    const alarmeRepository = AppDataSource.getRepository(Alarme);
    const alertaRepository = AppDataSource.getRepository(Alerta);
    const medidaRepository = AppDataSource.getRepository(Medidas);

    // Verificar se o alerta existe e obter o título
    const alerta = await alertaRepository.findOne({ where: { id_alerta } });
    if (!alerta) {
      throw new Error("Alerta não encontrado");
    }

    const tituloAlerta = alerta.nome;

    // Verificar se a medida existe
    const medida = await medidaRepository.findOne({
      where: { id_medida },
      relations: ["parametro"], // Incluindo a relação com o parâmetro
    });
    if (!medida) {
      throw new Error("Medida não encontrada");
    }

    // Obter o nome do tipo de parâmetro
    const parametro = medida.parametro;
    if (!parametro) {
      throw new Error("Parâmetro não encontrado para a medida");
    }

    const nomeParametro = parametro.tipoParametro.nome.toLowerCase();
    if (nomeParametro === "temperatura" && medida.valor > 40) {
      // Condições atendidas, cadastrar o alarme
      const novoAlarme = alarmeRepository.create({
        data_alarme: new Date(), // Data e hora atual
        alerta: alerta,
        medida: medida,
      });

      console.log(`Cadastrando alarme para o alerta: ${tituloAlerta}`);
      return await alarmeRepository.save(novoAlarme);
    }

    // Se as condições não forem atendidas, não faz nada
    return null;
  }
}

export default new AlarmeService();
