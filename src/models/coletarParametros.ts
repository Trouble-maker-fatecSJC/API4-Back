import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Estacao } from "./estacao";
import { Parametros } from "./parametros";
import { Medidas } from "./medidas";
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

    @ManyToOne(() => Medidas, { eager: true }) // Adicionando eager para carregar automaticamente
    @JoinColumn({ name: "id_medida" })
    medida: Medidas;

    @Column({ type: "timestamp" })
    data_coleta: Date;  // Data e hora da coleta
}