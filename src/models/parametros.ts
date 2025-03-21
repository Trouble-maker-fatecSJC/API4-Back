import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Usuario } from "./usuario";
import { TipoParametro } from "./tipoParametro";
import { EstacaoPrincipal } from "./estacao";
import { Medidas } from "./medidas";

@Entity("parametros")
export class Parametros {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "float" })
    velocidade_vento: number;

    @Column({ type: "float" })
    direcao_vento: number;

    @Column({ type: "float" })
    temperatura: number;

    @Column({ type: "float" })
    umidade: number;

    @Column({ type: "float" })
    chuva: number;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: "cpf_usuario" })
    usuario: Usuario;

    @ManyToOne(() => TipoParametro)
    @JoinColumn({ name: "tipo_parametro" })
    tipoParametro: TipoParametro;

    @ManyToOne(() => EstacaoPrincipal)
    @JoinColumn({ name: "id_da_estacao" })
    estacao: EstacaoPrincipal;

    @ManyToOne(() => Medidas)
    @JoinColumn({ name: "id_de_medida" })
    medida: Medidas;
}
