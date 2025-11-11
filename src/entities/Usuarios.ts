import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { AlergiasMascotas } from "./AlergiasMascotas";
import { Auditoria } from "./Auditoria";
import { Cirugias } from "./Cirugias";
import { CitasMedicas } from "./CitasMedicas";
import { CondicionesCronicas } from "./CondicionesCronicas";
import { Desparacitaciones } from "./Desparacitaciones";
import { ExamenesLaboratorio } from "./ExamenesLaboratorio";
import { HistorialClinico } from "./HistorialClinico";
import { RecetasMedicas } from "./RecetasMedicas";
import { Reservas } from "./Reservas";
import { ServiciosRealizados } from "./ServiciosRealizados";
import { Roles } from "./Roles";
import { Vacunaciones } from "./Vacunaciones";

@Index("idx_usuarios_activo", ["activo"], {})
@Index("usuarios_documento_identidad_key", ["documentoIdentidad"], {
  unique: true,
})
@Index("usuarios_email_key", ["email"], { unique: true })
@Index("idx_usuarios_email", ["email"], {})
@Index("idx_usuarios_rol", ["idRol"], {})
@Index("usuarios_pkey", ["idUsuario"], { unique: true })
@Index("usuarios_username_key", ["username"], { unique: true })
@Entity("usuarios", { schema: "public" })
export class Usuarios {
  @Column("uuid", {
    primary: true,
    name: "id_usuario",
    default: () => "uuid_generate_v4()",
  })
  idUsuario: string;

  @Column("uuid", { name: "id_rol" })
  idRol: string;

  @Column("character varying", { name: "nombres", length: 100 })
  nombres: string;

  @Column("character varying", { name: "apellidos", length: 100 })
  apellidos: string;

  @Column("character varying", { name: "email", unique: true, length: 150 })
  email: string;

  @Column("character varying", { name: "telefono", length: 20 })
  telefono: string;

  @Column("character varying", { name: "username", unique: true, length: 50 })
  username: string;

  @Column("character varying", { name: "password_hash", length: 255 })
  passwordHash: string;

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

  @Column("character varying", {
    name: "direccion",
    nullable: true,
    length: 100,
  })
  direccion: string | null;

  @Column("character varying", {
    name: "especialidad",
    nullable: true,
    length: 100,
  })
  especialidad: string | null;

  @Column("character varying", {
    name: "numero_colegiatura",
    nullable: true,
    length: 50,
  })
  numeroColegiatura: string | null;

  @Column("boolean", { name: "activo", nullable: true, default: () => "true" })
  activo: boolean | null;

  @Column("timestamp without time zone", {
    name: "ultimo_acceso",
    nullable: true,
  })
  ultimoAcceso: Date | null;

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

  @OneToMany(
    () => AlergiasMascotas,
    (alergiasMascotas) => alergiasMascotas.idVeterinarioDiagnostica
  )
  alergiasMascotas: AlergiasMascotas[];

  @OneToMany(() => Auditoria, (auditoria) => auditoria.idUsuario)
  auditorias: Auditoria[];

  @OneToMany(() => Cirugias, (cirugias) => cirugias.idVeterinarioAnestesista)
  cirugias: Cirugias[];

  @OneToMany(() => Cirugias, (cirugias) => cirugias.idVeterinarioCirujano)
  cirugias2: Cirugias[];

  @OneToMany(() => CitasMedicas, (citasMedicas) => citasMedicas.idVeterinario2)
  citasMedicas: CitasMedicas[];

  @OneToMany(
    () => CondicionesCronicas,
    (condicionesCronicas) => condicionesCronicas.idVeterinarioDiagnostico
  )
  condicionesCronicas: CondicionesCronicas[];

  @OneToMany(
    () => Desparacitaciones,
    (desparacitaciones) => desparacitaciones.idVeterinario
  )
  desparacitaciones: Desparacitaciones[];

  @OneToMany(
    () => ExamenesLaboratorio,
    (examenesLaboratorio) => examenesLaboratorio.idVeterinarioEncargado
  )
  examenesLaboratorios: ExamenesLaboratorio[];

  @OneToMany(
    () => HistorialClinico,
    (historialClinico) => historialClinico.idVeterinario2
  )
  historialClinicos: HistorialClinico[];

  @OneToMany(
    () => RecetasMedicas,
    (recetasMedicas) => recetasMedicas.idVeterinario
  )
  recetasMedicas: RecetasMedicas[];

  @OneToMany(() => Reservas, (reservas) => reservas.idUsuarioResponde)
  reservas: Reservas[];

  @OneToMany(
    () => ServiciosRealizados,
    (serviciosRealizados) => serviciosRealizados.creadoPor
  )
  serviciosRealizados: ServiciosRealizados[];

  @OneToMany(
    () => ServiciosRealizados,
    (serviciosRealizados) => serviciosRealizados.idVeterinarioResponsable2
  )
  serviciosRealizados2: ServiciosRealizados[];

  @ManyToOne(() => Roles, (roles) => roles.usuarios)
  @JoinColumn([{ name: "id_rol", referencedColumnName: "idRol" }])
  idRol2: Roles;

  @OneToMany(() => Vacunaciones, (vacunaciones) => vacunaciones.idVeterinario)
  vacunaciones: Vacunaciones[];
}
