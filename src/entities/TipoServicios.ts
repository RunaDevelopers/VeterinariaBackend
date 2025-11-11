import { Column, Entity, Index, OneToMany } from "typeorm";
import { CitasMedicas } from "./CitasMedicas";
import { Reservas } from "./Reservas";
import { ServiciosRealizados } from "./ServiciosRealizados";

@Index("tipo_servicios_pkey", ["idTipoServicio"], { unique: true })
@Index("tipo_servicios_nombre_servicio_key", ["nombreServicio"], {
  unique: true,
})
@Entity("tipo_servicios", { schema: "public" })
export class TipoServicios {
  @Column("uuid", {
    primary: true,
    name: "id_tipo_servicio",
    default: () => "uuid_generate_v4()",
  })
  idTipoServicio: string;

  @Column("character varying", {
    name: "nombre_servicio",
    unique: true,
    length: 100,
  })
  nombreServicio: string;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("character varying", {
    name: "categoria",
    nullable: true,
    length: 50,
  })
  categoria: string | null;

  @Column("boolean", {
    name: "requiere_cita",
    nullable: true,
    default: () => "true",
  })
  requiereCita: boolean | null;

  @Column("boolean", {
    name: "requiere_veterinario",
    nullable: true,
    default: () => "true",
  })
  requiereVeterinario: boolean | null;

  @Column("integer", { name: "duracion_estimada_minutos", nullable: true })
  duracionEstimadaMinutos: number | null;

  @Column("numeric", {
    name: "precio_base",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  precioBase: string | null;

  @Column("boolean", { name: "activo", nullable: true, default: () => "true" })
  activo: boolean | null;

  @Column("timestamp without time zone", {
    name: "fecha_creacion",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaCreacion: Date | null;

  @Column("timestamp without time zone", {
    name: "fecha_modificacion",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaModificacion: Date | null;

  @OneToMany(() => CitasMedicas, (citasMedicas) => citasMedicas.idTipoServicio)
  citasMedicas: CitasMedicas[];

  @OneToMany(() => Reservas, (reservas) => reservas.idTipoServicio)
  reservas: Reservas[];

  @OneToMany(
    () => ServiciosRealizados,
    (serviciosRealizados) => serviciosRealizados.idTipoServicio2
  )
  serviciosRealizados: ServiciosRealizados[];
}
