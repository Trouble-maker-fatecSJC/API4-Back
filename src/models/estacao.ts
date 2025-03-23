import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("estacao")
export class Estacao {
    @PrimaryGeneratedColumn()
    id_estacao: number;

    @Column({ type: "int", nullable: true })
    uid: number;

    @Column({ length: 100 })
    nome: string;

    @Column({ length: 400 })
    endereco: string;

    @Column({ length: 100 })
    latitude: string;

    @Column({ length: 100 })
    longitude: string;
}
