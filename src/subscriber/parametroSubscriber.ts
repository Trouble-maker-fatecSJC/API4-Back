// import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
// import { Parametros } from "../models/parametros";
// import { ColetarParametros } from "../models/coletarParametros";

// @EventSubscriber()
// export class ParametrosSubscriber implements EntitySubscriberInterface<Parametros> {
//     listenTo() {
//         return Parametros;
//     }

//     async afterInsert(event: InsertEvent<Parametros>) {
//         const coletarParametrosRepository = event.manager.getRepository(ColetarParametros);

//         const novoColetarParametros = coletarParametrosRepository.create({
//             estacao: event.entity?.estacao,
//             parametro: event.entity,
//             data_coleta: new Date(),
//         });

//         await coletarParametrosRepository.save(novoColetarParametros);
//     }

//     async afterUpdate(event: UpdateEvent<Parametros>) {
//         const coletarParametrosRepository = event.manager.getRepository(ColetarParametros);
    
//         const novoColetarParametros = coletarParametrosRepository.create({
//             estacao: event.entity?.estacao,
//             parametro: event.entity,
//             data_coleta: new Date(),
//         });
    
//         await coletarParametrosRepository.save(novoColetarParametros);
//     }
// }


import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { Medidas } from "../models/medidas";
import { ColetarParametros } from "../models/coletarParametros";

@EventSubscriber()
export class MedidasSubscriber implements EntitySubscriberInterface<Medidas> {
    listenTo() {
        return Medidas;
    }

    async afterInsert(event: InsertEvent<Medidas>) {
        const coletarParametrosRepository = event.manager.getRepository(ColetarParametros);

        // Verifica se a medida tem todos os relacionamentos necessários
        if (!event.entity || !event.entity.estacao) {
            console.error("Dados incompletos na medida:", event.entity);
            return;
        }

        const novaColeta = coletarParametrosRepository.create({
            medida: event.entity,
            estacao: event.entity.estacao,
            data_coleta: new Date()
        });

        await coletarParametrosRepository.save(novaColeta);
    }

    async afterUpdate(event: UpdateEvent<Medidas>) {
        const coletarParametrosRepository = event.manager.getRepository(ColetarParametros);
        const medidasRepository = event.manager.getRepository(Medidas);

        if (!event.entity || !event.entity.estacao) {
            console.error("Dados incompletos na medida atualizada:", event.entity);
            return;
        }

        // Busca a medida completa com todas as relações
        const medidaCompleta = await medidasRepository.findOne({
            where: { id_medida: event.entity.id_medida },
            relations: ['estacao', 'parametro']
        });

        if (!medidaCompleta) {
            console.error("Medida não encontrada");
            return;
        }

        // Busca coleta existente
        const coletaExistente = await coletarParametrosRepository.findOne({
            where: { medida: { id_medida: medidaCompleta.id_medida } }
        });

        if (coletaExistente) {
            // Atualiza a coleta existente
            coletaExistente.estacao = medidaCompleta.estacao;
            coletaExistente.medida = medidaCompleta; // Agora usando a medida completa
            await coletarParametrosRepository.save(coletaExistente);
        } else {
            // Cria uma nova coleta
            const novaColeta = coletarParametrosRepository.create({
                medida: medidaCompleta,
                estacao: medidaCompleta.estacao,
                data_coleta: new Date()
            });
            await coletarParametrosRepository.save(novaColeta);
        }
    }
}