import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Alerta } from "./Alertas";
import { Medidas } from "./medidas";

@Entity("alarme")
export class Alarme {
    @PrimaryGeneratedColumn()
    id_alarme: number;

    @Column({ type: "timestamp" })
    data_alarme: Date;

    @OneToOne(() => Alerta, { nullable: false }) // Um alarme pertence a um e somente um alerta
    @JoinColumn({ name: "id_alerta" })
    alerta: Alerta;

    @ManyToOne(() => Medidas) // Muitos alarmes podem estar associados a uma única medida
    @JoinColumn({ name: "id_medida" })
    medida: Medidas;
}
