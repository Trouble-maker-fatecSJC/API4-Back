import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Estacao } from "./estacao";
import { Parametros } from "./parametros";

@Entity("coletar_parametros")
export class ColetarParametros {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Estacao)
    @JoinColumn({ name: "id_estacao" })
    estacao: Estacao;

    @ManyToOne(() => Parametros, { eager: true })
    @JoinColumn({ name: "id_parametro" })
    parametro: Parametros;

    @Column({ type: "timestamp" })
    data_coleta: Date;  // Data e hora da coleta
}