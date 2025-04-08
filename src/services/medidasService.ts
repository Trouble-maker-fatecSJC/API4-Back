import { AppDataSource } from "../config/database";
import { Medidas } from "../models/medidas";
import { Repository } from "typeorm";
import AlarmeService from "./alarmeService"; // Importando o serviço de alarmes
import alertaService from "./alertaService"; // Corrigido para usar o nome correto

class MedidasService {
  private medidasRepository: Repository<Medidas>;

  constructor() {
    this.medidasRepository = AppDataSource.getRepository(Medidas);
  }

  async cadastrar(dados: Medidas) {
    const medida = this.medidasRepository.create(dados);
    const medidaSalva = await this.medidasRepository.save(medida);

    // Verificar se o parâmetro é "Temperatura" ou "temperatura" e o valor é maior que 40
    if (
      medidaSalva.parametro?.tipoParametro?.nome?.toLowerCase() === "temperatura" &&
      medidaSalva.valor > 40
    ) {
      // Buscar o alerta com título "Temperatura"
      const alerta = await alertaService.buscarPorTitulo("Temperatura");
      if (alerta) {
        // Chamar o serviço de alarmes para cadastrar automaticamente
        await AlarmeService.cadastrarEmitirAlarme(alerta.id_alerta, medidaSalva.id_medida);
      }
    }

    return medidaSalva;
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
    this.medidasRepository.merge(medida, dados);
    return await this.medidasRepository.save(medida);
  }
}

export default new MedidasService();
