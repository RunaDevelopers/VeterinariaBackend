import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Usuarios } from "./Usuarios";

@Index("auditoria_pkey", ["idAuditoria"], { unique: true })
@Entity("auditoria", { schema: "public" })
export class Auditoria {
  @Column("uuid", {
    primary: true,
    name: "id_auditoria",
    default: () => "uuid_generate_v4()",
  })
  idAuditoria: string;

  @Column("character varying", { name: "tabla_afectada", length: 100 })
  tablaAfectada: string;

  @Column("character varying", { name: "operacion", length: 20 })
  operacion: string;

  @Column("uuid", { name: "registro_id", nullable: true })
  registroId: string | null;

  @Column("jsonb", { name: "datos_anteriores", nullable: true })
  datosAnteriores: object | null;

  @Column("jsonb", { name: "datos_nuevos", nullable: true })
  datosNuevos: object | null;

  @Column("text", { name: "user_agent", nullable: true })
  userAgent: string | null;

  @Column("timestamp without time zone", {
    name: "fecha_operacion",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaOperacion: Date | null;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.auditorias)
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "idUsuario" }])
  idUsuario: Usuarios;
}
