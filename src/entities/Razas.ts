import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Mascotas } from "./Mascotas";
import { Especies } from "./Especies";

@Index("razas_id_especie_nombre_raza_key", ["idEspecie", "nombreRaza"], {
  unique: true,
})
@Index("razas_pkey", ["idRaza"], { unique: true })
@Entity("razas", { schema: "public" })
export class Razas {
  @Column("uuid", {
    primary: true,
    name: "id_raza",
    default: () => "uuid_generate_v4()",
  })
  idRaza: string;

  @Column("uuid", { name: "id_especie", unique: true })
  idEspecie: string;

  @Column("character varying", {
    name: "nombre_raza",
    unique: true,
    length: 100,
  })
  nombreRaza: string;

  @Column("character varying", { name: "tamanio", nullable: true, length: 20 })
  tamanio: string | null;

  @Column("text", { name: "caracteristicas", nullable: true })
  caracteristicas: string | null;

  @Column("numeric", {
    name: "peso_promedio_min",
    nullable: true,
    precision: 5,
    scale: 2,
  })
  pesoPromedioMin: number | null;

  @Column("numeric", {
    name: "peso_promedio_max",
    nullable: true,
    precision: 5,
    scale: 2,
  })
  pesoPromedioMax: number | null;

  @Column("integer", { name: "esperanza_vida_anios", nullable: true })
  esperanzaVidaAnios: number | null;

  @Column("boolean", { name: "activo", nullable: true, default: () => "true" })
  activo: boolean | null;

  @Column("timestamp without time zone", {
    name: "fecha_creacion",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaCreacion: Date | null;

  @OneToMany(() => Mascotas, (mascotas) => mascotas.idRaza)
  mascotas: Mascotas[];

  @ManyToOne(() => Especies, (especies) => especies.razas)
  @JoinColumn([{ name: "id_especie", referencedColumnName: "idEspecie" }])
  idEspecie2: Especies;
}
