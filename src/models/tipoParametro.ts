import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("tipo_parametro")
export class TipoParametro {
    @PrimaryGeneratedColumn()
    id_tipo_param: number;

    @Column({ length: 50 })
    json_param: string;

    @Column({ length: 150 })
    nome: string;

    @Column({ length: 30 })
    unidade: string;

    @Column({ length: 5 })
    qtd_casadesc: string;

    @Column({ length: 40 })
    fator: string;
}