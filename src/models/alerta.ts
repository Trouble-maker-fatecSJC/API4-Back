import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { TipoAlerta } from "./tipoAlerta";

@Entity("alerta")
export class Alerta {
    @PrimaryGeneratedColumn()
    id_alerta: number;

    @Column({ type: "date" })
    data_alerta: Date;

    @ManyToOne(() => TipoAlerta)
    @JoinColumn({ name: "tipo_alerta" })
    tipoAlerta: TipoAlerta;
}
