import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("medidas")
export class Medidas {
    @PrimaryGeneratedColumn()
    id_medida: number;

    @Column({ type: "float" })
    valor: number;

    @Column({ length: 100 })
    unix_time: string;
}
