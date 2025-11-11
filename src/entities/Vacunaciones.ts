import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { HistorialClinico } from "./HistorialClinico";
import { Mascotas } from "./Mascotas";
import { ServiciosRealizados } from "./ServiciosRealizados";
import { Usuarios } from "./Usuarios";

@Index("idx_vacunaciones_fecha", ["fechaAplicacion"], {})
@Index("idx_vacunaciones_mascota", ["idMascota"], {})
@Index("vacunaciones_pkey", ["idVacunacion"], { unique: true })
@Entity("vacunaciones", { schema: "public" })
export class Vacunaciones {
  @Column("uuid", {
    primary: true,
    name: "id_vacunacion",
    default: () => "uuid_generate_v4()",
  })
  idVacunacion: string;

  @Column("uuid", { name: "id_mascota" })
  idMascota: string;

  @Column("character varying", { name: "nombre_vacuna", length: 150 })
  nombreVacuna: string;

  @Column("character varying", {
    name: "tipo_vacuna",
    nullable: true,
    length: 100,
  })
  tipoVacuna: string | null;

  @Column("character varying", {
    name: "laboratorio",
    nullable: true,
    length: 100,
  })
  laboratorio: string | null;

  @Column("date", { name: "fecha_aplicacion" })
  fechaAplicacion: string;

  @Column("date", { name: "fecha_proxima_dosis", nullable: true })
  fechaProximaDosis: string | null;

  @Column("integer", { name: "dosis_numero", nullable: true })
  dosisNumero: number | null;

  @Column("character varying", {
    name: "via_administracion",
    nullable: true,
    length: 50,
  })
  viaAdministracion: string | null;

  @Column("character varying", {
    name: "sitio_aplicacion",
    nullable: true,
    length: 100,
  })
  sitioAplicacion: string | null;

  @Column("text", { name: "reaccion_adversa", nullable: true })
  reaccionAdversa: string | null;

  @Column("text", { name: "observaciones", nullable: true })
  observaciones: string | null;

  @Column("character varying", {
    name: "certificado_ruta",
    nullable: true,
    length: 255,
  })
  certificadoRuta: string | null;

  @Column("timestamp without time zone", {
    name: "fecha_creacion",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaCreacion: Date | null;

  @ManyToOne(
    () => HistorialClinico,
    (historialClinico) => historialClinico.vacunaciones
  )
  @JoinColumn([
    { name: "id_historial_clinico", referencedColumnName: "idHistorial" },
  ])
  idHistorialClinico: HistorialClinico;

  @ManyToOne(() => Mascotas, (mascotas) => mascotas.vacunaciones)
  @JoinColumn([{ name: "id_mascota", referencedColumnName: "idMascota" }])
  idMascota2: Mascotas;

  @ManyToOne(
    () => ServiciosRealizados,
    (serviciosRealizados) => serviciosRealizados.vacunaciones
  )
  @JoinColumn([
    {
      name: "id_servicio_realizado",
      referencedColumnName: "idServicioRealizado",
    },
  ])
  idServicioRealizado: ServiciosRealizados;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.vacunaciones)
  @JoinColumn([{ name: "id_veterinario", referencedColumnName: "idUsuario" }])
  idVeterinario: Usuarios;
}
