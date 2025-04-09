import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Estacao } from "./estacao";
import { Parametros } from "./parametros";

@Entity("medidas")
export class Medidas {
    @PrimaryGeneratedColumn()
    id_medida: number;

    @Column({ type: "float" })
    valor: number;

    @Column({ type: "timestamp" }) // Alterado de string para timestamp
    unix_time: Date;

    @ManyToOne(() => Estacao)
    @JoinColumn({ name: "id_estacao" })
    estacao: Estacao;

    @ManyToOne(() => Parametros)
    @JoinColumn({ name: "id_parametro" })
    parametro: Parametros;
}
