import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { CitasMedicas } from "./CitasMedicas";
import { Clientes } from "./Clientes";
import { Mascotas } from "./Mascotas";
import { TipoServicios } from "./TipoServicios";
import { Usuarios } from "./Usuarios";

@Index("idx_reservas_estado", ["estado"], {})
@Index("idx_reservas_fecha", ["fechaSolicitada"], {})
@Index("idx_reservas_cliente", ["idCliente"], {})
@Index("idx_reservas_mascota", ["idMascota"], {})
@Index("reservas_pkey", ["idReserva"], { unique: true })
@Entity("reservas", { schema: "public" })
export class Reservas {
  @Column("uuid", {
    primary: true,
    name: "id_reserva",
    default: () => "uuid_generate_v4()",
  })
  idReserva: string;

  @Column("uuid", { name: "id_cliente" })
  idCliente: string;

  @Column("uuid", { name: "id_mascota" })
  idMascota: string;

  @Column("date", { name: "fecha_solicitada" })
  fechaSolicitada: string;

  @Column("time without time zone", { name: "hora_solicitada" })
  horaSolicitada: string;

  @Column("character varying", {
    name: "estado",
    nullable: true,
    length: 20,
    default: () => "'PENDIENTE'",
  })
  estado: string | null;

  @Column("text", { name: "observaciones_cliente", nullable: true })
  observacionesCliente: string | null;

  @Column("text", { name: "motivo_rechazo", nullable: true })
  motivoRechazo: string | null;

  @Column("timestamp without time zone", {
    name: "fecha_respuesta",
    nullable: true,
  })
  fechaRespuesta: Date | null;

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

  @OneToMany(() => CitasMedicas, (citasMedicas) => citasMedicas.idReserva)
  citasMedicas: CitasMedicas[];

  @ManyToOne(() => Clientes, (clientes) => clientes.reservas)
  @JoinColumn([{ name: "id_cliente", referencedColumnName: "idCliente" }])
  idCliente2: Clientes;

  @ManyToOne(() => Mascotas, (mascotas) => mascotas.reservas)
  @JoinColumn([{ name: "id_mascota", referencedColumnName: "idMascota" }])
  idMascota2: Mascotas;

  @ManyToOne(() => TipoServicios, (tipoServicios) => tipoServicios.reservas)
  @JoinColumn([
    { name: "id_tipo_servicio", referencedColumnName: "idTipoServicio" },
  ])
  idTipoServicio: TipoServicios;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.reservas)
  @JoinColumn([
    { name: "id_usuario_responde", referencedColumnName: "idUsuario" },
  ])
  idUsuarioResponde: Usuarios;
}
