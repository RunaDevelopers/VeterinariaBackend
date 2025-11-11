import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Cirugias } from "./Cirugias";
import { Desparacitaciones } from "./Desparacitaciones";
import { HistorialClinico } from "./HistorialClinico";
import { ServicioProductos } from "./ServicioProductos";
import { Usuarios } from "./Usuarios";
import { CitasMedicas } from "./CitasMedicas";
import { Clientes } from "./Clientes";
import { Mascotas } from "./Mascotas";
import { TipoServicios } from "./TipoServicios";
import { Vacunaciones } from "./Vacunaciones";

@Index("idx_servicios_fecha", ["fechaServicio"], {})
@Index("idx_servicios_mascota", ["idMascota"], {})
@Index("servicios_realizados_pkey", ["idServicioRealizado"], { unique: true })
@Index("idx_servicios_tipo", ["idTipoServicio"], {})
@Index("idx_servicios_veterinario", ["idVeterinarioResponsable"], {})
@Entity("servicios_realizados", { schema: "public" })
export class ServiciosRealizados {
  @Column("uuid", {
    primary: true,
    name: "id_servicio_realizado",
    default: () => "uuid_generate_v4()",
  })
  idServicioRealizado: string;

  @Column("uuid", { name: "id_mascota" })
  idMascota: string;

  @Column("uuid", { name: "id_tipo_servicio" })
  idTipoServicio: string;

  @Column("uuid", { name: "id_veterinario_responsable" })
  idVeterinarioResponsable: string;

  @Column("date", { name: "fecha_servicio" })
  fechaServicio: string;

  @Column("time without time zone", { name: "hora_inicio" })
  horaInicio: string;

  @Column("time without time zone", { name: "hora_fin", nullable: true })
  horaFin: string | null;

  @Column("character varying", {
    name: "tipo_banio",
    nullable: true,
    length: 50,
  })
  tipoBanio: string | null;

  @Column("character varying", {
    name: "tipo_corte",
    nullable: true,
    length: 50,
  })
  tipoCorte: string | null;

  @Column("text", { name: "detalles_procedimiento", nullable: true })
  detallesProcedimiento: string | null;

  @Column("text", { name: "comportamiento_mascota", nullable: true })
  comportamientoMascota: string | null;

  @Column("text", { name: "observaciones", nullable: true })
  observaciones: string | null;

  @Column("text", { name: "complicaciones", nullable: true })
  complicaciones: string | null;

  @Column("numeric", {
    name: "costo_servicio",
    precision: 10,
    scale: 2,
    default: () => "0",
  })
  costoServicio: string;

  @Column("numeric", {
    name: "costo_productos",
    nullable: true,
    precision: 10,
    scale: 2,
    default: () => "0",
  })
  costoProductos: string | null;

  @Column("numeric", {
    name: "descuento",
    nullable: true,
    precision: 10,
    scale: 2,
    default: () => "0",
  })
  descuento: string | null;

  @Column("numeric", { name: "costo_total", precision: 10, scale: 2 })
  costoTotal: string;

  @Column("character varying", {
    name: "estado_pago",
    nullable: true,
    length: 20,
    default: () => "'PENDIENTE'",
  })
  estadoPago: string | null;

  @Column("character varying", {
    name: "metodo_pago",
    nullable: true,
    length: 50,
  })
  metodoPago: string | null;

  @Column("boolean", {
    name: "requiere_seguimiento",
    nullable: true,
    default: () => "false",
  })
  requiereSeguimiento: boolean | null;

  @Column("date", { name: "fecha_proximo_control", nullable: true })
  fechaProximoControl: string | null;

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

  @OneToMany(() => Cirugias, (cirugias) => cirugias.idServicioRealizado)
  cirugias: Cirugias[];

  @OneToMany(
    () => Desparacitaciones,
    (desparacitaciones) => desparacitaciones.idServicioRealizado
  )
  desparacitaciones: Desparacitaciones[];

  @OneToMany(
    () => HistorialClinico,
    (historialClinico) => historialClinico.idServicioRealizado
  )
  historialClinicos: HistorialClinico[];

  @OneToMany(
    () => ServicioProductos,
    (servicioProductos) => servicioProductos.idServicioRealizado
  )
  servicioProductos: ServicioProductos[];

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.serviciosRealizados)
  @JoinColumn([{ name: "creado_por", referencedColumnName: "idUsuario" }])
  creadoPor: Usuarios;

  @ManyToOne(
    () => CitasMedicas,
    (citasMedicas) => citasMedicas.serviciosRealizados
  )
  @JoinColumn([{ name: "id_cita", referencedColumnName: "idCita" }])
  idCita: CitasMedicas;

  @ManyToOne(() => Clientes, (clientes) => clientes.serviciosRealizados)
  @JoinColumn([{ name: "id_cliente", referencedColumnName: "idCliente" }])
  idCliente: Clientes;

  @ManyToOne(() => Mascotas, (mascotas) => mascotas.serviciosRealizados)
  @JoinColumn([{ name: "id_mascota", referencedColumnName: "idMascota" }])
  idMascota2: Mascotas;

  @ManyToOne(
    () => TipoServicios,
    (tipoServicios) => tipoServicios.serviciosRealizados
  )
  @JoinColumn([
    { name: "id_tipo_servicio", referencedColumnName: "idTipoServicio" },
  ])
  idTipoServicio2: TipoServicios;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.serviciosRealizados2)
  @JoinColumn([
    { name: "id_veterinario_responsable", referencedColumnName: "idUsuario" },
  ])
  idVeterinarioResponsable2: Usuarios;

  @OneToMany(
    () => Vacunaciones,
    (vacunaciones) => vacunaciones.idServicioRealizado
  )
  vacunaciones: Vacunaciones[];
}
