import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Mascotas } from "./Mascotas";
import { Usuarios } from "./Usuarios";

@Index("idx_condiciones_activa", ["activa"], {})
@Index("condiciones_cronicas_pkey", ["idCondicion"], { unique: true })
@Index("idx_condiciones_mascota", ["idMascota"], {})
@Entity("condiciones_cronicas", { schema: "public" })
export class CondicionesCronicas {
  @Column("uuid", {
    primary: true,
    name: "id_condicion",
    default: () => "uuid_generate_v4()",
  })
  idCondicion: string;

  @Column("uuid", { name: "id_mascota" })
  idMascota: string;

  @Column("character varying", { name: "nombre_condicion", length: 150 })
  nombreCondicion: string;

  @Column("character varying", {
    name: "codigo_cie10",
    nullable: true,
    length: 20,
  })
  codigoCie10: string | null;

  @Column("date", { name: "fecha_diagnostico" })
  fechaDiagnostico: string;

  @Column("character varying", { name: "gravedad", nullable: true, length: 20 })
  gravedad: string | null;

  @Column("text", { name: "tratamiento_actual", nullable: true })
  tratamientoActual: string | null;

  @Column("text", { name: "medicamentos_permanentes", nullable: true })
  medicamentosPermanentes: string | null;

  @Column("text", { name: "dieta_especial", nullable: true })
  dietaEspecial: string | null;

  @Column("text", { name: "restricciones", nullable: true })
  restricciones: string | null;

  @Column("character varying", {
    name: "frecuencia_controles",
    nullable: true,
    length: 100,
  })
  frecuenciaControles: string | null;

  @Column("text", { name: "pronostico", nullable: true })
  pronostico: string | null;

  @Column("boolean", { name: "activa", nullable: true, default: () => "true" })
  activa: boolean | null;

  @Column("date", { name: "fecha_remision", nullable: true })
  fechaRemision: string | null;

  @Column("text", { name: "observaciones", nullable: true })
  observaciones: string | null;

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

  @ManyToOne(() => Mascotas, (mascotas) => mascotas.condicionesCronicas)
  @JoinColumn([{ name: "id_mascota", referencedColumnName: "idMascota" }])
  idMascota2: Mascotas;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.condicionesCronicas)
  @JoinColumn([
    { name: "id_veterinario_diagnostico", referencedColumnName: "idUsuario" },
  ])
  idVeterinarioDiagnostico: Usuarios;
}
