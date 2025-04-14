import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Alerta } from "./Alertas";
import { Medidas } from "./medidas";
@Entity("alarme")
export class Alarme {
    @PrimaryGeneratedColumn()
    id_alarme: number;

    @Column({ type: "timestamp" })
    data_alarme: Date;

    @ManyToOne(() => Alerta, { nullable: false }) // Um alarme pertence a um e somente um alerta
    @JoinColumn({ name: "id_alerta" })
    alerta: Alerta;

    @ManyToOne(() => Medidas, { nullable: false }) // Um alarme contém uma e somente uma medida
    @JoinColumn({ name: "id_medida" })
    medida: Medidas;
}
