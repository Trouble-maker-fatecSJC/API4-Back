import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Parametros } from "./parametros";

@Entity("tipo_alerta")
export class TipoAlerta {
    @PrimaryGeneratedColumn()
    id_tipo_alerta: number;

    @Column({ length: 50 })
    nome: string;

    @Column({ length: 200 })
    conteudo: string;

    @ManyToOne(() => Parametros)
    @JoinColumn({ name: "id_do_parametro" })
    parametro: Parametros;
}
