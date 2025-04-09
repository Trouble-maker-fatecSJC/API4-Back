import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { TipoParametro } from "./tipoParametro";
import { Estacao } from "./estacao";

@Entity("parametros")
export class Parametros {
    @PrimaryGeneratedColumn()
    id_parametro: number;

    @ManyToOne(() => TipoParametro)
    @JoinColumn({ name: "tipo_parametro" })
    tipoParametro: TipoParametro;

}
