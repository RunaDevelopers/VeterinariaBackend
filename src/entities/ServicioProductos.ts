import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Productos } from "./Productos";
import { ServiciosRealizados } from "./ServiciosRealizados";

@Index("servicio_productos_pkey", ["idServicioProducto"], { unique: true })
@Entity("servicio_productos", { schema: "public" })
export class ServicioProductos {
  @Column("uuid", {
    primary: true,
    name: "id_servicio_producto",
    default: () => "uuid_generate_v4()",
  })
  idServicioProducto: string;

  @Column("numeric", { name: "cantidad_usada", precision: 10, scale: 2 })
  cantidadUsada: string;

  @Column("text", { name: "motivo_uso", nullable: true })
  motivoUso: string | null;

  @Column("character varying", {
    name: "reaccion_mascota",
    nullable: true,
    length: 20,
  })
  reaccionMascota: string | null;

  @Column("text", { name: "observaciones", nullable: true })
  observaciones: string | null;

  @Column("numeric", {
    name: "costo_unitario",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  costoUnitario: string | null;

  @Column("numeric", {
    name: "costo_total",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  costoTotal: string | null;

  @Column("timestamp without time zone", {
    name: "fecha_aplicacion",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaAplicacion: Date | null;

  @ManyToOne(() => Productos, (productos) => productos.servicioProductos)
  @JoinColumn([{ name: "id_producto", referencedColumnName: "idProducto" }])
  idProducto: Productos;

  @ManyToOne(
    () => ServiciosRealizados,
    (serviciosRealizados) => serviciosRealizados.servicioProductos,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([
    {
      name: "id_servicio_realizado",
      referencedColumnName: "idServicioRealizado",
    },
  ])
  idServicioRealizado: ServiciosRealizados;
}
