import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { HistorialClinico } from "./HistorialClinico";
import { Mascotas } from "./Mascotas";
import { Usuarios } from "./Usuarios";

@Index("examenes_laboratorio_codigo_examen_key", ["codigoExamen"], {
  unique: true,
})
@Index("examenes_laboratorio_pkey", ["idExamen"], { unique: true })
@Entity("examenes_laboratorio", { schema: "public" })
export class ExamenesLaboratorio {
  @Column("uuid", {
    primary: true,
    name: "id_examen",
    default: () => "uuid_generate_v4()",
  })
  idExamen: string;

  @Column("character varying", {
    name: "codigo_examen",
    nullable: true,
    unique: true,
    length: 50,
  })
  codigoExamen: string | null;

  @Column("character varying", { name: "tipo_examen", length: 100 })
  tipoExamen: string;

  @Column("character varying", {
    name: "categoria",
    nullable: true,
    length: 50,
  })
  categoria: string | null;

  @Column("date", { name: "fecha_resultados", nullable: true })
  fechaResultados: string | null;

  @Column("character varying", {
    name: "laboratorio_externo",
    nullable: true,
    length: 150,
  })
  laboratorioExterno: string | null;

  @Column("character varying", {
    name: "archivo_adjunto",
    nullable: true,
    length: 255,
  })
  archivoAdjunto: string | null;

  @Column("numeric", { name: "costo", nullable: true, precision: 10, scale: 2 })
  costo: string | null;

  @Column("timestamp without time zone", {
    name: "fecha_creacion",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaCreacion: Date | null;

  @ManyToOne(
    () => HistorialClinico,
    (historialClinico) => historialClinico.examenesLaboratorios
  )
  @JoinColumn([
    { name: "id_historial_clinico", referencedColumnName: "idHistorial" },
  ])
  idHistorialClinico: HistorialClinico;

  @ManyToOne(() => Mascotas, (mascotas) => mascotas.examenesLaboratorios)
  @JoinColumn([{ name: "id_mascota", referencedColumnName: "idMascota" }])
  idMascota: Mascotas;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.examenesLaboratorios)
  @JoinColumn([
    { name: "id_veterinario_encargado", referencedColumnName: "idUsuario" },
  ])
  idVeterinarioEncargado: Usuarios;
}
