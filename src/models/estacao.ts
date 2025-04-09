import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("estacao")
export class Estacao {
    @PrimaryGeneratedColumn()
    id_estacao: number;

    @Column({ type: "varchar", length: 100 }) // Alterado para string com tamanho máximo de 36 caracteres
    uid: string;

    @Column({ length: 100 })
    nome: string;

    @Column({ length: 400 })
    endereco: string;

    @Column("float")
    latitude: number;

    @Column("float")
    longitude: number;

    @Column({ type: "date" })
    data_instalacao: Date;

    @Column()
    status: boolean;

    @BeforeInsert()
    generateUid() {
        this.uid = uuidv4(); // Gera um UUID como string
    }
}
