import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { HistorialClinico } from "./HistorialClinico";
import { Mascotas } from "./Mascotas";
import { ServiciosRealizados } from "./ServiciosRealizados";
import { Usuarios } from "./Usuarios";

@Index("cirugias_pkey", ["idCirugia"], { unique: true })
@Entity("cirugias", { schema: "public" })
export class Cirugias {
  @Column("uuid", {
    primary: true,
    name: "id_cirugia",
    default: () => "uuid_generate_v4()",
  })
  idCirugia: string;

  @Column("character varying", { name: "tipo_cirugia", length: 100 })
  tipoCirugia: string;

  @Column("character varying", {
    name: "clasificacion",
    nullable: true,
    length: 50,
  })
  clasificacion: string | null;

  @Column("timestamp without time zone", { name: "fecha_cirugia" })
  fechaCirugia: Date;

  @Column("integer", { name: "duracion_minutos", nullable: true })
  duracionMinutos: number | null;

  @Column("text", { name: "equipo_apoyo", nullable: true })
  equipoApoyo: string | null;

  @Column("text", { name: "diagnostico_preoperatorio", nullable: true })
  diagnosticoPreoperatorio: string | null;

  @Column("text", { name: "examenes_preoperatorios", nullable: true })
  examenesPreoperatorios: string | null;

  @Column("character varying", {
    name: "riesgo_anestesico",
    nullable: true,
    length: 20,
  })
  riesgoAnestesico: string | null;

  @Column("character varying", {
    name: "tipo_anestesia",
    nullable: true,
    length: 50,
  })
  tipoAnestesia: string | null;

  @Column("text", { name: "protocolo_anestesico", nullable: true })
  protocoloAnestesico: string | null;

  @Column("text", { name: "medicamentos_anestesia", nullable: true })
  medicamentosAnestesia: string | null;

  @Column("text", { name: "descripcion_procedimiento" })
  descripcionProcedimiento: string;

  @Column("text", { name: "hallazgos_quirurgicos", nullable: true })
  hallazgosQuirurgicos: string | null;

  @Column("text", { name: "tecnica_utilizada", nullable: true })
  tecnicaUtilizada: string | null;

  @Column("text", { name: "complicaciones_intraoperatorias", nullable: true })
  complicacionesIntraoperatorias: string | null;

  @Column("character varying", {
    name: "estado_postoperatorio",
    nullable: true,
    length: 50,
  })
  estadoPostoperatorio: string | null;

  @Column("text", { name: "recomendaciones_postoperatorias", nullable: true })
  recomendacionesPostoperatorias: string | null;

  @Column("text", { name: "medicacion_postoperatoria", nullable: true })
  medicacionPostoperatoria: string | null;

  @Column("date", { name: "fecha_retiro_puntos", nullable: true })
  fechaRetiroPuntos: string | null;

  @Column("character varying", {
    name: "resultado",
    nullable: true,
    length: 50,
  })
  resultado: string | null;

  @Column("boolean", {
    name: "requiere_hospitalizacion",
    nullable: true,
    default: () => "false",
  })
  requiereHospitalizacion: boolean | null;

  @Column("integer", { name: "dias_hospitalizacion", nullable: true })
  diasHospitalizacion: number | null;

  @Column("numeric", {
    name: "costo_cirugia",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  costoCirugia: string | null;

  @Column("text", { name: "observaciones", nullable: true })
  observaciones: string | null;

  @Column("timestamp without time zone", {
    name: "fecha_creacion",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaCreacion: Date | null;

  @ManyToOne(
    () => HistorialClinico,
    (historialClinico) => historialClinico.cirugias
  )
  @JoinColumn([
    { name: "id_historial_clinico", referencedColumnName: "idHistorial" },
  ])
  idHistorialClinico: HistorialClinico;

  @ManyToOne(() => Mascotas, (mascotas) => mascotas.cirugias)
  @JoinColumn([{ name: "id_mascota", referencedColumnName: "idMascota" }])
  idMascota: Mascotas;

  @ManyToOne(
    () => ServiciosRealizados,
    (serviciosRealizados) => serviciosRealizados.cirugias
  )
  @JoinColumn([
    {
      name: "id_servicio_realizado",
      referencedColumnName: "idServicioRealizado",
    },
  ])
  idServicioRealizado: ServiciosRealizados;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.cirugias)
  @JoinColumn([
    { name: "id_veterinario_anestesista", referencedColumnName: "idUsuario" },
  ])
  idVeterinarioAnestesista: Usuarios;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.cirugias2)
  @JoinColumn([
    { name: "id_veterinario_cirujano", referencedColumnName: "idUsuario" },
  ])
  idVeterinarioCirujano: Usuarios;
}
