import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { TipoServicios } from "./TipoServicios";

@Index("lead_pkey", ["idLead"], { unique: true })
@Index("lead_correo_key", ["correo"], { unique: true })
@Entity("lead", { schema: "public" })
export class Leads {
  @Column("uuid", {
    primary: true,
    name: "id_lead",
    default: () => "gen_random_uuid()",
  })
  idLead: string;

  @Column("character varying", { name: "nombres", length: 225 })
  nombres: string;

  @Column("character varying", { name: "apellidos", length: 225 })
  apellidos: string;

  @Column("character varying", { name: "telefono", length: 225 })
  telefono: string;

  @Column("character varying", {
    name: "correo",
    unique: true,
    length: 225,
  })
  correo: string;

  @Column("date", { name: "fecha_tentativa", nullable: true })
  fechaTentativa: Date | null;

  @Column("uuid", { name: "id_tipo_servicios" })
  idTipoServicios: string;

  @Column("date", { name: "fecha_creacion" })
  fechaCreacion: Date;

  @ManyToOne(() => TipoServicios, { nullable: false })
  @JoinColumn({ name: "id_tipo_servicios", referencedColumnName: "idTipoServicio" })
  tipoServicio: TipoServicios;
}
