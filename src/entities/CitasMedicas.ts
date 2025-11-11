import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Clientes } from "./Clientes";
import { Mascotas } from "./Mascotas";
import { Reservas } from "./Reservas";
import { TipoServicios } from "./TipoServicios";
import { Usuarios } from "./Usuarios";
import { HistorialClinico } from "./HistorialClinico";
import { RecetasMedicas } from "./RecetasMedicas";
import { ServiciosRealizados } from "./ServiciosRealizados";

@Index("idx_citas_estado", ["estado"], {})
@Index("idx_citas_fecha", ["fechaCita"], {})
@Index("citas_medicas_pkey", ["idCita"], { unique: true })
@Index("idx_citas_mascota", ["idMascota"], {})
@Index("idx_citas_veterinario", ["idVeterinario"], {})
@Entity("citas_medicas", { schema: "public" })
export class CitasMedicas {
  @Column("uuid", {
    primary: true,
    name: "id_cita",
    default: () => "uuid_generate_v4()",
  })
  idCita: string;

  @Column("uuid", { name: "id_mascota" })
  idMascota: string;

  @Column("uuid", { name: "id_veterinario" })
  idVeterinario: string;

  @Column("date", { name: "fecha_cita" })
  fechaCita: string;

  @Column("time without time zone", { name: "hora_inicio" })
  horaInicio: string;

  @Column("time without time zone", { name: "hora_fin", nullable: true })
  horaFin: string | null;

  @Column("character varying", {
    name: "estado",
    nullable: true,
    length: 20,
    default: () => "'PROGRAMADA'",
  })
  estado: string | null;

  @Column("text", { name: "motivo_consulta", nullable: true })
  motivoConsulta: string | null;

  @Column("character varying", {
    name: "prioridad",
    nullable: true,
    length: 20,
    default: () => "'NORMAL'",
  })
  prioridad: string | null;

  @Column("text", { name: "notas_preparacion", nullable: true })
  notasPreparacion: string | null;

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

  @ManyToOne(() => Clientes, (clientes) => clientes.citasMedicas)
  @JoinColumn([{ name: "id_cliente", referencedColumnName: "idCliente" }])
  idCliente: Clientes;

  @ManyToOne(() => Mascotas, (mascotas) => mascotas.citasMedicas)
  @JoinColumn([{ name: "id_mascota", referencedColumnName: "idMascota" }])
  idMascota2: Mascotas;

  @ManyToOne(() => Reservas, (reservas) => reservas.citasMedicas)
  @JoinColumn([{ name: "id_reserva", referencedColumnName: "idReserva" }])
  idReserva: Reservas;

  @ManyToOne(() => TipoServicios, (tipoServicios) => tipoServicios.citasMedicas)
  @JoinColumn([
    { name: "id_tipo_servicio", referencedColumnName: "idTipoServicio" },
  ])
  idTipoServicio: TipoServicios;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.citasMedicas)
  @JoinColumn([{ name: "id_veterinario", referencedColumnName: "idUsuario" }])
  idVeterinario2: Usuarios;

  @OneToMany(
    () => HistorialClinico,
    (historialClinico) => historialClinico.idCita
  )
  historialClinicos: HistorialClinico[];

  @OneToMany(() => RecetasMedicas, (recetasMedicas) => recetasMedicas.idCita)
  recetasMedicas: RecetasMedicas[];

  @OneToMany(
    () => ServiciosRealizados,
    (serviciosRealizados) => serviciosRealizados.idCita
  )
  serviciosRealizados: ServiciosRealizados[];
}
