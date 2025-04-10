import {
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
  } from "typeorm";
  import { Medidas } from "../models/medidas";
  import { Alarme } from "../models/Alarme";
  import { Alerta } from "../models/Alertas";
  import { Like } from "typeorm";
  @EventSubscriber()
  export class AlarmeSubscriber implements EntitySubscriberInterface<Medidas> {
    listenTo() {
      return Medidas; // Listen to events on the Medidas entity
    }
  
    async afterInsert(event: InsertEvent<Medidas>) {
      console.log("Evento afterInsert disparado para Medidas.");
  
      const medida = event.entity;
  
      if (!medida) {
        console.error("A entidade Medidas está ausente no evento.");
        return;
      }
  
      console.log("Medida recebida no evento:", medida);
  
      // Buscar a medida completa com os relacionamentos necessários
      const medidaCompleta = await event.manager.findOne(Medidas, {
        where: { id_medida: medida.id_medida },
        relations: ["estacao", "parametro", "parametro.tipoParametro"],
      });
  
      if (!medidaCompleta) {
        console.error("Não foi possível carregar os dados completos da medida.");
        return;
      }
  
      console.log("Medida completa carregada:", medidaCompleta);
  
      // Check if the conditions are met
      if (
        medidaCompleta.estacao?.nome?.toLowerCase().includes("vento") && // Verifica se o nome da estação contém "vento"
        medidaCompleta.parametro?.tipoParametro?.nome?.toLowerCase().includes("vento") && // Verifica se o nome do tipo de parâmetro contém "vento"
        medidaCompleta.valor >= 80
      ) {
        console.log("Condições atendidas para criação de alarme.");
      
        const alertaRepository = event.manager.getRepository(Alerta);
        const alarmeRepository = event.manager.getRepository(Alarme);
      
        try {
          // Find the Alerta containing the word "vento"
          const alerta = await alertaRepository.findOne({
            where: {nome: Like('%vento%') },
          });
      
          if (!alerta || !alerta.nome.toLowerCase().includes("vento")) {
            console.error("Alerta com nome contendo 'vento' não encontrado.");
            return;
          }
      
          console.log("Alerta encontrado:", alerta);
      
          // Create a new Alarme
          const novoAlarme = alarmeRepository.create({
            data_alarme: new Date(), // Current date
            alerta: alerta, // Associate the found Alerta
            medida: medidaCompleta, // Associate the current Medida
          });
      
          // Save the new Alarme
          await alarmeRepository.save(novoAlarme);
          console.log("Novo alarme criado com sucesso:", novoAlarme);
        } catch (error) {
          console.error("Erro ao criar ou salvar o alarme:", error);
        }
      } else {
        console.log("Condições não atendidas para criação de alarme.");
        console.log("Estação:", medidaCompleta.estacao?.nome);
        console.log("Parâmetro:", medidaCompleta.parametro?.tipoParametro?.nome);
        console.log("Valor:", medidaCompleta.valor);
      }
    }
  }

  