import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Mascotas } from "./Mascotas";
import { Productos } from "./Productos";
import { Usuarios } from "./Usuarios";

@Index("idx_alergias_activa", ["activa"], {})
@Index("alergias_mascotas_pkey", ["idAlergia"], { unique: true })
@Index("idx_alergias_mascota", ["idMascota"], {})
@Entity("alergias_mascotas", { schema: "public" })
export class AlergiasMascotas {
  @Column("uuid", {
    primary: true,
    name: "id_alergia",
    default: () => "uuid_generate_v4()",
  })
  idAlergia: string;

  @Column("uuid", { name: "id_mascota" })
  idMascota: string;

  @Column("character varying", { name: "tipo_alergia", length: 50 })
  tipoAlergia: string;

  @Column("character varying", { name: "nombre_alergeno", length: 200 })
  nombreAlergeno: string;

  @Column("character varying", { name: "severidad", length: 20 })
  severidad: string;

  @Column("text", { name: "sintomas_presentados", nullable: true })
  sintomasPresentados: string | null;

  @Column("text", { name: "tratamiento_requerido", nullable: true })
  tratamientoRequerido: string | null;

  @Column("date", { name: "fecha_deteccion" })
  fechaDeteccion: string;

  @Column("date", { name: "fecha_ultimo_episodio", nullable: true })
  fechaUltimoEpisodio: string | null;

  @Column("boolean", { name: "activa", nullable: true, default: () => "true" })
  activa: boolean | null;

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

  @ManyToOne(() => Mascotas, (mascotas) => mascotas.alergiasMascotas)
  @JoinColumn([{ name: "id_mascota", referencedColumnName: "idMascota" }])
  idMascota2: Mascotas;

  @ManyToOne(() => Productos, (productos) => productos.alergiasMascotas)
  @JoinColumn([{ name: "id_producto", referencedColumnName: "idProducto" }])
  idProducto: Productos;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.alergiasMascotas)
  @JoinColumn([
    { name: "id_veterinario_diagnostica", referencedColumnName: "idUsuario" },
  ])
  idVeterinarioDiagnostica: Usuarios;
}
