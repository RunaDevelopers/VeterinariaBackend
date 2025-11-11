import { Column, Entity, Index, OneToMany } from "typeorm";
import { Usuarios } from "./Usuarios";

@Index("roles_pkey", ["idRol"], { unique: true })
@Index("roles_nombre_rol_key", ["nombreRol"], { unique: true })
@Entity("roles", { schema: "public" })
export class Roles {
  @Column("uuid", {
    primary: true,
    name: "id_rol",
    default: () => "uuid_generate_v4()",
  })
  idRol: string;

  @Column("character varying", { name: "nombre_rol", unique: true, length: 50 })
  nombreRol: string;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("boolean", { name: "activo", nullable: true, default: () => "true" })
  activo: boolean | null;

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

  @OneToMany(() => Usuarios, (usuarios) => usuarios.idRol2)
  usuarios: Usuarios[];
}
