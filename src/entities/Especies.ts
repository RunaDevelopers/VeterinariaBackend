import { Column, Entity, Index, OneToMany } from "typeorm";
import { Mascotas } from "./Mascotas";
import { Razas } from "./Razas";

@Index("especies_pkey", ["idEspecie"], { unique: true })
@Index("especies_nombre_especie_key", ["nombreEspecie"], { unique: true })
@Entity("especies", { schema: "public" })
export class Especies {
  @Column("uuid", {
    primary: true,
    name: "id_especie",
    default: () => "uuid_generate_v4()",
  })
  idEspecie: string;

  @Column("character varying", {
    name: "nombre_especie",
    unique: true,
    length: 50,
  })
  nombreEspecie: string;

  @Column("character varying", {
    name: "nombre_cientifico",
    nullable: true,
    length: 100,
  })
  nombreCientifico: string | null;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("boolean", { name: "activo", nullable: true, default: () => "true" })
  activo: boolean | null;

  @Column("timestamp without time zone", {
    name: "fecha_creacion",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaCreacion: Date | null;

  @OneToMany(() => Mascotas, (mascotas) => mascotas.idEspecie2)
  mascotas: Mascotas[];

  @OneToMany(() => Razas, (razas) => razas.idEspecie2)
  razas: Razas[];
}
