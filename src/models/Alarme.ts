import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Alerta } from "./Alertas";

@Entity("alarme")
export class Alarme {
    @PrimaryGeneratedColumn()
    id_alarme: number;

    @Column({ type: "timestamp" })
    data_alarme: Date;

    @OneToOne(() => Alerta, { nullable: false }) // Um alarme pertence a um e somente um alerta
    @JoinColumn({ name: "id_alerta" })
    alerta: Alerta;
}
