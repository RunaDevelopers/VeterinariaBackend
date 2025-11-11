import { Column, Entity, Index, OneToMany } from "typeorm";
import { Productos } from "./Productos";

@Index("tipo_producto_pkey", ["idTipoProducto"], { unique: true })
@Index("tipo_producto_nombre_tipo_key", ["nombreTipo"], { unique: true })
@Entity("tipo_producto", { schema: "public" })
export class TipoProducto {
  @Column("uuid", {
    primary: true,
    name: "id_tipo_producto",
    default: () => "uuid_generate_v4()",
  })
  idTipoProducto: string;

  @Column("character varying", {
    name: "nombre_tipo",
    unique: true,
    length: 100,
  })
  nombreTipo: string;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("boolean", {
    name: "requiere_prescripcion",
    nullable: true,
    default: () => "false",
  })
  requierePrescripcion: boolean | null;

  @Column("boolean", { name: "activo", nullable: true, default: () => "true" })
  activo: boolean | null;

  @Column("timestamp without time zone", {
    name: "fecha_creacion",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaCreacion: Date | null;

  @OneToMany(() => Productos, (productos) => productos.idTipoProducto2)
  productos: Productos[];
}
