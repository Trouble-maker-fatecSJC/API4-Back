import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Parametros } from "./parametros";

@Entity("alerta")
export class Alerta {
    @PrimaryGeneratedColumn()
    id_alerta: number;

    @Column({ length: 50 })
    nome: string;

    @Column({ length: 200 })
    conteudo: string;

    @ManyToOne(() => Parametros, { nullable: false }) // Um alerta deve conter pelo menos um parâmetro
    @JoinColumn({ name: "id_do_parametro" })
    parametro: Parametros;
}
