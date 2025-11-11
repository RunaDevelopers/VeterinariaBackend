import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { HistorialClinico } from "./HistorialClinico";
import { Mascotas } from "./Mascotas";
import { Productos } from "./Productos";
import { ServiciosRealizados } from "./ServiciosRealizados";
import { Usuarios } from "./Usuarios";

@Index("idx_desparacitaciones_fecha", ["fechaAplicacion"], {})
@Index("desparacitaciones_pkey", ["idDesparacitacion"], { unique: true })
@Index("idx_desparacitaciones_mascota", ["idMascota"], {})
@Entity("desparacitaciones", { schema: "public" })
export class Desparacitaciones {
  @Column("uuid", {
    primary: true,
    name: "id_desparacitacion",
    default: () => "uuid_generate_v4()",
  })
  idDesparacitacion: string;

  @Column("uuid", { name: "id_mascota" })
  idMascota: string;

  @Column("character varying", { name: "nombre_producto", length: 150 })
  nombreProducto: string;

  @Column("character varying", {
    name: "tipo_desparasitante",
    nullable: true,
    length: 50,
  })
  tipoDesparasitante: string | null;

  @Column("date", { name: "fecha_aplicacion" })
  fechaAplicacion: string;

  @Column("date", { name: "fecha_proxima_dosis", nullable: true })
  fechaProximaDosis: string | null;

  @Column("numeric", { name: "peso_mascota_kg", precision: 5, scale: 2 })
  pesoMascotaKg: string;

  @Column("character varying", {
    name: "dosis_administrada",
    nullable: true,
    length: 100,
  })
  dosisAdministrada: string | null;

  @Column("character varying", {
    name: "via_administracion",
    nullable: true,
    length: 50,
  })
  viaAdministracion: string | null;

  @Column("text", { name: "parasitos_objetivo", nullable: true })
  parasitosObjetivo: string | null;

  @Column("character varying", {
    name: "efectividad",
    nullable: true,
    length: 50,
  })
  efectividad: string | null;

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
    (historialClinico) => historialClinico.desparacitaciones
  )
  @JoinColumn([
    { name: "id_historial_clinico", referencedColumnName: "idHistorial" },
  ])
  idHistorialClinico: HistorialClinico;

  @ManyToOne(() => Mascotas, (mascotas) => mascotas.desparacitaciones)
  @JoinColumn([{ name: "id_mascota", referencedColumnName: "idMascota" }])
  idMascota2: Mascotas;

  @ManyToOne(() => Productos, (productos) => productos.desparacitaciones)
  @JoinColumn([{ name: "id_producto", referencedColumnName: "idProducto" }])
  idProducto: Productos;

  @ManyToOne(
    () => ServiciosRealizados,
    (serviciosRealizados) => serviciosRealizados.desparacitaciones
  )
  @JoinColumn([
    {
      name: "id_servicio_realizado",
      referencedColumnName: "idServicioRealizado",
    },
  ])
  idServicioRealizado: ServiciosRealizados;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.desparacitaciones)
  @JoinColumn([{ name: "id_veterinario", referencedColumnName: "idUsuario" }])
  idVeterinario: Usuarios;
}
