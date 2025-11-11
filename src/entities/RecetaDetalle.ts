import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Productos } from "./Productos";
import { RecetasMedicas } from "./RecetasMedicas";

@Index("receta_detalle_pkey", ["idDetalle"], { unique: true })
@Entity("receta_detalle", { schema: "public" })
export class RecetaDetalle {
  @Column("uuid", {
    primary: true,
    name: "id_detalle",
    default: () => "uuid_generate_v4()",
  })
  idDetalle: string;

  @Column("character varying", { name: "nombre_medicamento", length: 200 })
  nombreMedicamento: string;

  @Column("character varying", {
    name: "presentacion",
    nullable: true,
    length: 100,
  })
  presentacion: string | null;

  @Column("character varying", {
    name: "concentracion",
    nullable: true,
    length: 100,
  })
  concentracion: string | null;

  @Column("numeric", { name: "cantidad", precision: 10, scale: 2 })
  cantidad: string;

  @Column("character varying", { name: "dosis", length: 200 })
  dosis: string;

  @Column("character varying", {
    name: "frecuencia",
    nullable: true,
    length: 100,
  })
  frecuencia: string | null;

  @Column("character varying", {
    name: "duracion_tratamiento",
    nullable: true,
    length: 100,
  })
  duracionTratamiento: string | null;

  @Column("character varying", {
    name: "via_administracion",
    nullable: true,
    length: 50,
  })
  viaAdministracion: string | null;

  @Column("text", { name: "instrucciones_especiales", nullable: true })
  instruccionesEspeciales: string | null;

  @Column("integer", { name: "orden", nullable: true })
  orden: number | null;

  @Column("timestamp without time zone", {
    name: "fecha_creacion",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaCreacion: Date | null;

  @ManyToOne(() => Productos, (productos) => productos.recetaDetalles)
  @JoinColumn([{ name: "id_producto", referencedColumnName: "idProducto" }])
  idProducto: Productos;

  @ManyToOne(
    () => RecetasMedicas,
    (recetasMedicas) => recetasMedicas.recetaDetalles,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "id_receta", referencedColumnName: "idReceta" }])
  idReceta: RecetasMedicas;
}
