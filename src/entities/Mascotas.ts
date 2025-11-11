import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { AlergiasMascotas } from "./AlergiasMascotas";
import { Cirugias } from "./Cirugias";
import { CitasMedicas } from "./CitasMedicas";
import { CondicionesCronicas } from "./CondicionesCronicas";
import { Desparacitaciones } from "./Desparacitaciones";
import { ExamenesLaboratorio } from "./ExamenesLaboratorio";
import { HistorialClinico } from "./HistorialClinico";
import { Clientes } from "./Clientes";
import { Especies } from "./Especies";
import { Razas } from "./Razas";
import { RecetasMedicas } from "./RecetasMedicas";
import { Reservas } from "./Reservas";
import { ServiciosRealizados } from "./ServiciosRealizados";
import { Vacunaciones } from "./Vacunaciones";

@Index("idx_mascotas_activo", ["activo"], {})
@Index("idx_mascotas_cliente", ["idCliente"], {})
@Index("idx_mascotas_especie", ["idEspecie"], {})
@Index("mascotas_pkey", ["idMascota"], { unique: true })
@Entity("mascotas", { schema: "public" })
export class Mascotas {
  @Column("uuid", {
    primary: true,
    name: "id_mascota",
    default: () => "uuid_generate_v4()",
  })
  idMascota: string;

  @Column("uuid", { name: "id_cliente" })
  idCliente: string;

  @Column("uuid", { name: "id_especie" })
  idEspecie: string;

  @Column("character varying", { name: "nombre_mascota", length: 100 })
  nombreMascota: string;

  @Column("date", { name: "fecha_nacimiento", nullable: true })
  fechaNacimiento: string | null;

  @Column("character varying", {
    name: "edad_estimada",
    nullable: true,
    length: 50,
  })
  edadEstimada: string | null;

  @Column("character", { name: "sexo", nullable: true, length: 1 })
  sexo: string | null;

  @Column("character varying", { name: "color", nullable: true, length: 100 })
  color: string | null;

  @Column("text", { name: "senias_particulares", nullable: true })
  seniasParticulares: string | null;

  @Column("character varying", {
    name: "numero_registro",
    nullable: true,
    length: 50,
  })
  numeroRegistro: string | null;

  @Column("numeric", {
    name: "peso_actual",
    nullable: true,
    precision: 5,
    scale: 2,
  })
  pesoActual: string | null;

  @Column("boolean", {
    name: "esterilizado",
    nullable: true,
    default: () => "false",
  })
  esterilizado: boolean | null;

  @Column("date", { name: "fecha_esterilizacion", nullable: true })
  fechaEsterilizacion: string | null;

  @Column("text", { name: "comportamiento", nullable: true })
  comportamiento: string | null;

  @Column("character varying", { name: "foto", nullable: true, length: 255 })
  foto: string | null;

  @Column("boolean", { name: "activo", nullable: true, default: () => "true" })
  activo: boolean | null;

  @Column("boolean", {
    name: "fallecido",
    nullable: true,
    default: () => "false",
  })
  fallecido: boolean | null;

  @Column("date", { name: "fecha_fallecimiento", nullable: true })
  fechaFallecimiento: string | null;

  @Column("text", { name: "causa_fallecimiento", nullable: true })
  causaFallecimiento: string | null;

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
    (alergiasMascotas) => alergiasMascotas.idMascota2
  )
  alergiasMascotas: AlergiasMascotas[];

  @OneToMany(() => Cirugias, (cirugias) => cirugias.idMascota)
  cirugias: Cirugias[];

  @OneToMany(() => CitasMedicas, (citasMedicas) => citasMedicas.idMascota2)
  citasMedicas: CitasMedicas[];

  @OneToMany(
    () => CondicionesCronicas,
    (condicionesCronicas) => condicionesCronicas.idMascota2
  )
  condicionesCronicas: CondicionesCronicas[];

  @OneToMany(
    () => Desparacitaciones,
    (desparacitaciones) => desparacitaciones.idMascota2
  )
  desparacitaciones: Desparacitaciones[];

  @OneToMany(
    () => ExamenesLaboratorio,
    (examenesLaboratorio) => examenesLaboratorio.idMascota
  )
  examenesLaboratorios: ExamenesLaboratorio[];

  @OneToMany(
    () => HistorialClinico,
    (historialClinico) => historialClinico.idMascota2
  )
  historialClinicos: HistorialClinico[];

  @ManyToOne(() => Clientes, (clientes) => clientes.mascotas)
  @JoinColumn([{ name: "id_cliente", referencedColumnName: "idCliente" }])
  idCliente2: Clientes;

  @ManyToOne(() => Especies, (especies) => especies.mascotas)
  @JoinColumn([{ name: "id_especie", referencedColumnName: "idEspecie" }])
  idEspecie2: Especies;

  @ManyToOne(() => Razas, (razas) => razas.mascotas)
  @JoinColumn([{ name: "id_raza", referencedColumnName: "idRaza" }])
  idRaza: Razas;

  @OneToMany(() => RecetasMedicas, (recetasMedicas) => recetasMedicas.idMascota)
  recetasMedicas: RecetasMedicas[];

  @OneToMany(() => Reservas, (reservas) => reservas.idMascota2)
  reservas: Reservas[];

  @OneToMany(
    () => ServiciosRealizados,
    (serviciosRealizados) => serviciosRealizados.idMascota2
  )
  serviciosRealizados: ServiciosRealizados[];

  @OneToMany(() => Vacunaciones, (vacunaciones) => vacunaciones.idMascota2)
  vacunaciones: Vacunaciones[];
}
