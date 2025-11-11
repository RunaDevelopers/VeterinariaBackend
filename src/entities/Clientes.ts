import { Column, Entity, Index, OneToMany } from "typeorm";
import { CitasMedicas } from "./CitasMedicas";
import { Mascotas } from "./Mascotas";
import { RecetasMedicas } from "./RecetasMedicas";
import { Reservas } from "./Reservas";
import { ServiciosRealizados } from "./ServiciosRealizados";

@Index("idx_clientes_activo", ["activo"], {})
@Index("idx_clientes_documento", ["documentoIdentidad"], {})
@Index("clientes_documento_identidad_key", ["documentoIdentidad"], {
  unique: true,
})
@Index("clientes_pkey", ["idCliente"], { unique: true })
@Index("idx_clientes_telefono", ["telefono"], {})
@Entity("clientes", { schema: "public" })
export class Clientes {
  @Column("uuid", {
    primary: true,
    name: "id_cliente",
    default: () => "uuid_generate_v4()",
  })
  idCliente: string;

  @Column("character varying", { name: "nombres", length: 100 })
  nombres: string;

  @Column("character varying", { name: "apellidos", length: 100 })
  apellidos: string;

  @Column("character varying", {
    name: "documento_identidad",
    nullable: true,
    unique: true,
    length: 20,
  })
  documentoIdentidad: string | null;

  @Column("character varying", {
    name: "tipo_documento",
    nullable: true,
    length: 20,
  })
  tipoDocumento: string | null;

  @Column("character varying", { name: "email", nullable: true, length: 150 })
  email: string | null;

  @Column("character varying", { name: "telefono", length: 20 })
  telefono: string;

  @Column("character varying", {
    name: "telefono_secundario",
    nullable: true,
    length: 20,
  })
  telefonoSecundario: string | null;

  @Column("character varying", {
    name: "direccion",
    nullable: true,
    length: 150,
  })
  direccion: string | null;

  @Column("character varying", {
    name: "distrito",
    nullable: true,
    length: 100,
  })
  distrito: string | null;

  @Column("character varying", { name: "ciudad", nullable: true, length: 100 })
  ciudad: string | null;

  @Column("character varying", {
    name: "referencia_direccion",
    nullable: true,
    length: 150,
  })
  referenciaDireccion: string | null;

  @Column("date", { name: "fecha_nacimiento", nullable: true })
  fechaNacimiento: string | null;

  @Column("character varying", {
    name: "preferencia_contacto",
    nullable: true,
    length: 20,
  })
  preferenciaContacto: string | null;

  @Column("text", { name: "notas_especiales", nullable: true })
  notasEspeciales: string | null;

  @Column("character varying", {
    name: "prioridad_cliente",
    nullable: true,
    length: 50,
  })
  prioridadCliente: string | null;

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

  @OneToMany(() => CitasMedicas, (citasMedicas) => citasMedicas.idCliente)
  citasMedicas: CitasMedicas[];

  @OneToMany(() => Mascotas, (mascotas) => mascotas.idCliente2)
  mascotas: Mascotas[];

  @OneToMany(() => RecetasMedicas, (recetasMedicas) => recetasMedicas.idCliente)
  recetasMedicas: RecetasMedicas[];

  @OneToMany(() => Reservas, (reservas) => reservas.idCliente2)
  reservas: Reservas[];

  @OneToMany(
    () => ServiciosRealizados,
    (serviciosRealizados) => serviciosRealizados.idCliente
  )
  serviciosRealizados: ServiciosRealizados[];
}
