import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("usuario")
export class Usuario {
    @PrimaryColumn({ type: "bigint" })
    cpf: string;

    @Column({ unique: true, length: 50 })
    email: string;


    @Column({ length: 200 })
    senha: string;

    @Column({ length: 200 })
    nome: string;

    @Column()
    tipo: number;
}
