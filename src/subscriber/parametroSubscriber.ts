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


import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent, RemoveEvent } from "typeorm";
import { Medidas } from "../models/medidas";
import { ColetarParametros } from "../models/coletarParametros";

@EventSubscriber()
export class MedidasSubscriber implements EntitySubscriberInterface<Medidas> {
    listenTo() {
        return Medidas; // Escuta eventos na entidade Medidas
    }

    async afterInsert(event: InsertEvent<Medidas>) {
        const coletarParametrosRepository = event.manager.getRepository(ColetarParametros);

        // Cria um novo registro na tabela ColetarParametros com as informações da medida
        const novaColeta = coletarParametrosRepository.create({
            medida: event.entity, // Relaciona com a medida recém-cadastrada
            estacao: event.entity.estacao, // Relaciona com a estação associada à medida
            parametro: event.entity.parametro, // Relaciona com o parâmetro associado à medida
            data_coleta: new Date(), // Define a data de coleta como a data atual
        });

        // Salva o novo registro na tabela ColetarParametros
        await coletarParametrosRepository.save(novaColeta);
    }

    async afterUpdate(event: UpdateEvent<Medidas>) {
        const coletarParametrosRepository = event.manager.getRepository(ColetarParametros);

        // Verifica se a entidade foi atualizada e se os relacionamentos estão presentes
        if (event.entity && event.entity.estacao && event.entity.parametro) {
            // Cria ou atualiza um registro na tabela ColetarParametros com as informações da medida atualizada
            const novaColeta = coletarParametrosRepository.create({
                medida: event.entity, // Relaciona com a medida atualizada
                estacao: event.entity.estacao, // Relaciona com a estação associada à medida
                parametro: event.entity.parametro, // Relaciona com o parâmetro associado à medida
                data_coleta: new Date(), // Define a data de coleta como a data atual
            });

            // Salva o novo registro ou atualiza o existente na tabela ColetarParametros
            await coletarParametrosRepository.save(novaColeta);
        } else {
            console.error("Estação ou parâmetro ausente na medida atualizada:", event.entity);
        }
    }
    // async afterRemove(event: RemoveEvent<Medidas>) {
    //     const coletarParametrosRepository = event.manager.getRepository(ColetarParametros);

    //     // Remove os registros na tabela ColetarParametros associados à medida deletada
    //     if (event.entity) {
    //         const medidaId = event.entity.id_medida;

    //         // Busca e remove os registros relacionados
    //         const coletasRelacionadas = await coletarParametrosRepository.find({
    //             where: { medida: { id_medida: medidaId } },
    //         });

    //         if (coletasRelacionadas.length > 0) {
    //             await coletarParametrosRepository.remove(coletasRelacionadas);
    //             console.log(`Registros relacionados à medida ${medidaId} foram removidos.`);
    //         } else {
    //             console.log(`Nenhum registro relacionado encontrado para a medida ${medidaId}.`);
    //         }
    //     } else {
    //         console.error("Entidade medida ausente no evento de remoção.");
    //     }
    // }
}


