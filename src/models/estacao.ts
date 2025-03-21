import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("estacao_principal")
export class EstacaoPrincipal {
    @PrimaryGeneratedColumn()
    id_estacao: number;

    @Column({ type: "int", nullable: true })
    uid: number;

    @Column({ length: 100 })
    nome: string;

    @Column({ length: 400 })
    endereco: string;

    @Column({ length: 100 })
    lat_long: string;
}
