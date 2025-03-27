import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";
import { Parametros } from "../models/parametros";
import { ColetarParametros } from "../models/coletarParametros";

@EventSubscriber()
export class ParametrosSubscriber implements EntitySubscriberInterface<Parametros> {
    listenTo() {
        return Parametros;
    }

    async afterInsert(event: InsertEvent<Parametros>) {
        const coletarParametrosRepository = event.manager.getRepository(ColetarParametros);

        const novoColetarParametros = coletarParametrosRepository.create({
            estacao: event.entity.estacao,
            parametro: event.entity,
            data_coleta: new Date(),
        });

        await coletarParametrosRepository.save(novoColetarParametros);
    }
}