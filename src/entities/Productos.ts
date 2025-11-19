import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { AlergiasMascotas } from "./AlergiasMascotas";
import { Desparacitaciones } from "./Desparacitaciones";
import { TipoProducto } from "./TipoProducto";
import { RecetaDetalle } from "./RecetaDetalle";
import { ServicioProductos } from "./ServicioProductos";

@Index("idx_productos_activo", ["activo"], {})
@Index("productos_codigo_producto_key", ["codigoProducto"], { unique: true })
@Index("productos_pkey", ["idProducto"], { unique: true })
@Index("idx_productos_tipo", ["idTipoProducto"], {})
@Index("idx_productos_stock", ["stockActual"], {})
@Entity("productos", { schema: "public" })
export class Productos {
  @Column("uuid", {
    primary: true,
    name: "id_producto",
    default: () => "uuid_generate_v4()",
  })
  idProducto: string;

  @Column("uuid", { name: "id_tipo_producto" })
  idTipoProducto: string;

  @Column("character varying", {
    name: "codigo_producto",
    nullable: true,
    unique: true,
    length: 50,
  })
  codigoProducto: string | null;

  @Column("character varying", { name: "nombre_producto", length: 200 })
  nombreProducto: string;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("character varying", { name: "marca", nullable: true, length: 100 })
  marca: string | null;

  @Column("character varying", {
    name: "presentacion",
    nullable: true,
    length: 100,
  })
  presentacion: string | null;

  @Column("boolean", {
    name: "requiere_receta",
    nullable: true,
    default: () => "false",
  })
  requiereReceta: boolean | null;

  @Column("boolean", {
    name: "requiere_refrigeracion",
    nullable: true,
    default: () => "false",
  })
  requiereRefrigeracion: boolean | null;

  @Column("integer", {
    name: "stock_actual",
    nullable: true,
    default: () => "0",
  })
  stockActual: number | null;

  @Column("integer", {
    name: "stock_minimo",
    nullable: true,
    default: () => "5",
  })
  stockMinimo: number | null;

  @Column("character varying", {
    name: "unidad_medida",
    nullable: true,
    length: 20,
  })
  unidadMedida: string | null;

  @Column("numeric", {
    name: "precio_compra",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  precioCompra: number | null;

  @Column("numeric", {
    name: "precio_venta",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  precioVenta: number | null;

  @Column("date", { name: "fecha_vencimiento", nullable: true })
  fechaVencimiento: Date | null;

  @Column("character varying", { name: "lote", nullable: true, length: 50 })
  lote: string | null;

  @Column("character varying", {
    name: "proveedor",
    nullable: true,
    length: 150,
  })
  proveedor: string | null;

  @Column("boolean", { name: "activo", nullable: true, default: () => "true" })
  activo: boolean | null;

  @Column("timestamp without time zone", {
    name: "fecha_registro",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaRegistro: Date | null;

  @Column("timestamp without time zone", {
    name: "fecha_modificacion",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaModificacion: Date | null;

  @OneToMany(
    () => AlergiasMascotas,
    (alergiasMascotas) => alergiasMascotas.idProducto
  )
  alergiasMascotas: AlergiasMascotas[];

  @OneToMany(
    () => Desparacitaciones,
    (desparacitaciones) => desparacitaciones.idProducto
  )
  desparacitaciones: Desparacitaciones[];

  @ManyToOne(() => TipoProducto, (tipoProducto) => tipoProducto.productos)
  @JoinColumn([
    { name: "id_tipo_producto", referencedColumnName: "idTipoProducto" },
  ])
  idTipoProducto2: TipoProducto;

  @OneToMany(() => RecetaDetalle, (recetaDetalle) => recetaDetalle.idProducto)
  recetaDetalles: RecetaDetalle[];

  @OneToMany(
    () => ServicioProductos,
    (servicioProductos) => servicioProductos.idProducto
  )
  servicioProductos: ServicioProductos[];
}
