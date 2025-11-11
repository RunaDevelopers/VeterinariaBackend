import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { RecetaDetalle } from "./RecetaDetalle";
import { CitasMedicas } from "./CitasMedicas";
import { Clientes } from "./Clientes";
import { HistorialClinico } from "./HistorialClinico";
import { Mascotas } from "./Mascotas";
import { Usuarios } from "./Usuarios";

@Index("recetas_medicas_codigo_receta_key", ["codigoReceta"], { unique: true })
@Index("recetas_medicas_pkey", ["idReceta"], { unique: true })
@Entity("recetas_medicas", { schema: "public" })
export class RecetasMedicas {
  @Column("uuid", {
    primary: true,
    name: "id_receta",
    default: () => "uuid_generate_v4()",
  })
  idReceta: string;

  @Column("character varying", {
    name: "codigo_receta",
    unique: true,
    length: 50,
  })
  codigoReceta: string;

  @Column("date", { name: "fecha_emision", default: () => "CURRENT_DATE" })
  fechaEmision: string;

  @Column("text", { name: "diagnostico" })
  diagnostico: string;

  @Column("text", { name: "indicaciones_generales", nullable: true })
  indicacionesGenerales: string | null;

  @Column("date", { name: "valida_hasta", nullable: true })
  validaHasta: string | null;

  @Column("integer", {
    name: "numero_renovaciones",
    nullable: true,
    default: () => "0",
  })
  numeroRenovaciones: number | null;

  @Column("character varying", {
    name: "estado",
    nullable: true,
    length: 20,
    default: () => "'ACTIVA'",
  })
  estado: string | null;

  @Column("text", { name: "observaciones", nullable: true })
  observaciones: string | null;

  @Column("timestamp without time zone", {
    name: "fecha_creacion",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaCreacion: Date | null;

  @OneToMany(() => RecetaDetalle, (recetaDetalle) => recetaDetalle.idReceta)
  recetaDetalles: RecetaDetalle[];

  @ManyToOne(() => CitasMedicas, (citasMedicas) => citasMedicas.recetasMedicas)
  @JoinColumn([{ name: "id_cita", referencedColumnName: "idCita" }])
  idCita: CitasMedicas;

  @ManyToOne(() => Clientes, (clientes) => clientes.recetasMedicas)
  @JoinColumn([{ name: "id_cliente", referencedColumnName: "idCliente" }])
  idCliente: Clientes;

  @ManyToOne(
    () => HistorialClinico,
    (historialClinico) => historialClinico.recetasMedicas
  )
  @JoinColumn([
    { name: "id_historial_clinico", referencedColumnName: "idHistorial" },
  ])
  idHistorialClinico: HistorialClinico;

  @ManyToOne(() => Mascotas, (mascotas) => mascotas.recetasMedicas)
  @JoinColumn([{ name: "id_mascota", referencedColumnName: "idMascota" }])
  idMascota: Mascotas;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.recetasMedicas)
  @JoinColumn([{ name: "id_veterinario", referencedColumnName: "idUsuario" }])
  idVeterinario: Usuarios;
}
